# @expraptor-security

@expraptor-security is a node.js package for securing an express application.

## Installation

```sh
$ npm install @expraptor-security
```

## Usage

### Simple Usage (using session authentication with a memory user store)

```typescript
import express from "express";
import session from "express-session";
import security from "@expraptor/security";

const port = 3000;
const app = express();
app.use(session({secret: "secret"}));
app.use(express.urlencoded());

const sec = security(app);
sec.buildAuth().inMemoryUser()
    .addUser("john", "john").withRoles("ADMIN").and()
    .addUser("jane", "jane").withAuthorities("CLIENT").and()
    .addUser("bob", "secret");

sec.httpSecurity().authorize()
    .requestMatcher("/client/(.*)").hasRole("ADMIN").hasAuthority("CLIENT")
    .and()
    .requestMatcher("/").permitAll()
    .anyRequest().authenticated();
sec.enable();

app.get("/", (req, res) => {
    res.send("Welcome, no authentication needed.");
});
app.get("/resource", (req, res) => {
    res.send("Welcome, You're authenticated.");
});
app.get("/client", (req, res) => {
    res.send("Welcome, you have access to client.");
});

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
```

### Custom User Authenticator (using session authentication with custom user authenticator)

```typescript
interface UserAuthentication extends security.auth.Authentication {
    password: string;
}

class UserAuthenticator implements security.auth.Authenticator {

    private store: Record<string, UserAuthentication> = {
        paul: {
            id: 1,
            login: "paul",
            password: "paul",
            roles: [],
            authorities: []
        },
        bob: {
            id: 2,
            login: "bob",
            password: "secret",
            roles: [],
            authorities: []
        }
    };

    authenticate(login: string, password: string): security.auth.Authentication {
        /**
         * You can use a database call to get user
         */
        const user = this.store[login];
        if (user && user.password === password) {
            return user;
        }
        return undefined;
    }
}

sec.buildAuth().authenticator(new UserAuthenticator());
```
### Stateless using JWT Token
#### First install jsonwebtoken
```sh
$ npm install jsonwebtoken
```
#### And
```typescript
import express from "express";
import security from "@expraptor/security";
import session from "express-session";

const app = express();
app.use(session({secret: "secret"}));
app.use(express.urlencoded());
const port = 3000;
const sec = security(app);
sec.buildAuth().stateless()
    .jwtTokenAuthentication("your-256-bit-secret");

sec.httpSecurity().authorize()
    .requestMatcher("/").permitAll()
    .anyRequest().authenticated();
sec.enable();

app.get("/", (req, res) => {
    res.send("WELCOME HOME");
});
app.get("/resource", (req, res) => {
    res.send("You're authenticated");
});
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
```
Now to test this example got to https://jwt.io/ and generate a jwt using your-256-bit-secret and put this token in request Authorization header. 
You can use curl or postman or any http client to test this example.
#### Put Roles and Authorities 
If you want to use roles and authorities in your Token, you have to define a JwtAuthorization to extract them from the decoded token.
Suppose that your decoded token is

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "claims": {
    "roles": ["USER"],
    "authorities": ["CLIENT"]
  }
}
```
Then your JwtAuthorization
```typescript
class JwtAuthorizationImpl implements security.auth.token.jwt.JwtAuthorization {

    getAuthorities(decoded: any): string[] {
        return decoded.claims.authorities;
    }

    getRoles(decoded: any): string[] {
        return decoded.claims.roles;
    }
}
sec.buildAuth().stateless()
    .jwtTokenAuthentication("your-256-bit-secret")
    .jwtAuthorization(new JwtAuthorizationImpl());

sec.httpSecurity().authorize()
    .requestMatcher("/").permitAll()
    .requestMatcher("/admin").hasRole("ADMIN").and()
    .requestMatcher("/client/**").hasAuthority("CLIENT").and()
    .anyRequest().authenticated();
sec.enable();

app.get("/", (req, res) => {
    res.send("WELCOME HOME");
});
app.get("/resource", (req, res) => {
    res.send("You're authenticated");
});
app.get("/admin", (req, res) => {
    res.send("You're admin");
});
app.get("/client", (req, res) => {
    res.send("You have CLIENT authority");
});
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
```