# @expraptor-web

A node js package that allow you to use typescript decorator to deploy your node express app.

## Installation

```sh
$ npm install @expraptor/web
```
tsconfig.json:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
## Usage
### Simple Usage
```typescript
import web from "@expraptor/web";

@web.Router({
    path: "/client"
})
export default class ClientRoute {
    @web.GET({
        path: ""
    })
    public static list(): string {
        return "Hello from /client";
    }
    @web.GET({
        path: "/:id"
    })
    public static get(@web.Path() id: number): Client {
        return `Hello from /client/${id}`;
    }
}
const server = new web.Server(3000);
server.register(ClientRoute);
server.start();
```
### Use view engine ex: ejs.
```sh
$ npm install ejs
```
home.ejs in views dir
```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Home</title>
</head>
<body>
<div class="container mt-2">
    <header>
        <h2>Welcome <%= name %></h2>
    </header>
    <section>
        <h2>Here is the body</h2>
        <p>
            <%= body %>!
        </p>
    </section>
    <footer>
        <h2>Here is the footer</h2>
    </footer>
</div>
</body>
</html>
```
```typescript
import web from "@expraptor/web";

@web.Router({
    path: ""
})
export default class Home {

    @web.GET({
        path: ""
    })
    // @ts-ignore
    public static home(): web.View {
        const view = new web.View("home");
        view.set("name", "Me");
        view.set("body", "Hello all");
        return view;
    }
}
const server = new web.Server(3000);
server.setViewEngine("ejs", "./views");
server.register(Home);
server.start();
```
### Enable security using @expraptor/security
```sh
$ npm install @expraptor/security
$ npm install express-session
```
```typescript
import security from "@expraptor/security";
import web from "@expraptor/web";
import session from "express-session";
import express from "express";

/**
 * Class to configure the security 
 */
class Security implements security.SecurityConfigurator {

    auth(builder: security.auth.AuthenticationBuilder) {
        builder.inMemoryUser()
            .addUser("john", "john", ["ADMIN"], [])
            .addUser("jane", "jane", [], ["CLIENT"])
            .addUser("bob", "secret", [], []);
    }

    http(http: security.http.HttpSecurity) {
        http.authorize()
            .requestMatcher("/", "/client/**").permitAll()
            .anyRequest().authenticated();
    }
}

@web.Router({
    path: "/client",
    middlewares: [express.json()]
})
class ClientRoute {

    @web.GET({
        path: ""
    })
    @security.PreAuthorize("$.hasAuthority('CLIENT')")
    public static list(): string {
        return "Cool you have CLIENT authority.";
    }

    @web.GET({
        path: "/:id"
    })
    @security.PreAuthorize("$.hasRole('ADMIN') OR $.hasAuthority('CLIENT')")
    public static get(@web.Path() id: number): string {
        return "";
    }
}

@web.Router({
    path: "/",
    middlewares: [express.json()]
})
class HomeRoute {

    @web.GET({
        path: ""
    })
    public static home(): string {
        return "Welcome home";
    }
}

const server = new web.Server(3000);
// Use session authentication 
server.use(session({secret: "secret"}));
// Use urlencoded because we ara using default login form
server.use(express.urlencoded());
server.enableSecurity(new Security());
server.register(HomeRoute);
server.register(ClientRoute);
server.start();
```
