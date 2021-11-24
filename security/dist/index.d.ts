import express from "express";

import {Configurator} from "./index";
import {HttpMethod} from "@expraptor/core";

declare function security(application: express.Express): Configurator;

declare namespace security {

    /**
     * Decorator for specifying a method access-control expression which will be evaluated to decide whether a method invocation is allowed or not.
     * Supported for web http mapping decorators methods.
     * @param {string} authorization: The method access-control expression
     * @constructor
     */
    export function PreAuthorize(authorization: string): MethodDecorator;

    export class Configurator {

        private constructor();

        /**
         * Get HttpSecurity configuration
         * @return {security.http.HttpSecurity}
         */
        httpSecurity(): security.http.HttpSecurity;

        /**
         * Get AuthenticationBuilder configuration
         * @return {security.auth.AuthenticationBuilder}
         */
        buildAuth(): security.auth.AuthenticationBuilder;
    }

    /**
     * Interface to implement for security configuration.
     * Supported by @expraptor web
     */
    export interface SecurityConfigurator {

        /**
         * Method to configure HttpSecurity.
         * @param {security.http.HttpSecurity} http: The HttpSecurity value.
         */
        http(http: security.http.HttpSecurity);

        /**
         * Method to configure AuthenticationBuilder.
         * @param {security.auth.AuthenticationBuilder} builder: The AuthenticationBuilder value.
         */
        auth(builder: security.auth.AuthenticationBuilder);
    }
}

declare namespace security.http {

    /**
     * AuthorizeRequests configuration
     */
    export class AuthorizeRequests {

        private constructor();

        /**
         * Add a new RequestMatcher.
         * @param {string[]} regex: The request matcher regexes; can be any of:
         * - A string representing a path.
         * - A path pattern.
         * - A regular expression pattern to match paths.
         * - An array of combinations of any of the above.
         */
        requestMatcher(...regex: string[]): RequestMatcher;

        /**
         * Add a new RequestMatcher for any request
         */
        anyRequest(): RequestMatcher;
    }

    /**
     * HttpSecurity configuration
     */
    export class HttpSecurity {

        private constructor();

        /**
         * Get AuthorizeRequests configuration
         */
        authorize(): AuthorizeRequests;

        /**
         * Activate cors (Cross-origin resource sharing)
         */
        cors(): HttpSecurity;
    }

    /**
     * Class to match http request
     */
    export class RequestMatcher {

        private constructor();

        /**
         * Set the matching request http methods
         * @param methods one or multiple http method
         */
        withMethod(...methods: HttpMethod[]): RequestMatcher;

        /**
         * Add all permission to requestMatcher
         */
        permitAll(): AuthorizeRequests;

        /**
         * Add authenticated permission condition to requestMatcher
         */
        authenticated(): AuthorizeRequests;

        /**
         * Add has role permission condition to requestMatcher
         * @param {string} role: The role value
         */
        hasRole(role: string): RequestMatcher;

        /**
         * Add has any of roles permission condition to requestMatcher
         * @param {string[]} roles: The roles list
         */
        hasAnyRoles(...roles: string[]): RequestMatcher;

        /**
         * Add has authority permission condition to requestMatcher
         * @param {string} authority: The authority value
         */
        hasAuthority(authority: string): RequestMatcher;

        /**
         * Add has any of authorities permission condition to requestMatcher
         * @param {string[]} authorities: The authorities list
         */
        hasAnyAuthorities(...authorities: string[]): RequestMatcher;

        /**
         * Get AuthorizeRequests configuration
         */
        and(): AuthorizeRequests;
    }
}

declare namespace security.auth {

    /**
     * Interface to implement a new Authentication
     */
    export interface Authentication {
        login: string;
        authorities: string[];
        roles: string[];
    }

    /**
     * Interface to implement an Authentication Provider
     */
    export interface AuthenticationProvider {

        /**
         * Get Authentication from request
         * @param {express.Request} request: the http request
         */
        getAuthentication(request: express.Request): RequestAuthentication;

        /**
         * Set Authentication to request
         * @param {express.Request} request: The http request
         * @param {Authentication} authentication: The authentication
         */
        setAuthentication?(request: express.Request, authentication: Authentication);
    }

    /**
     * Interface to implement a new login password authenticator
     */
    export interface Authenticator {
        /**
         * Get authentication using login and password
         * @param {string} login: login value
         * @param {string} password: password value
         */
        authenticate(login: string, password: string): Authentication;
    }

    /**
     * Interface to implement authentication error handling
     */
    export interface AuthErrorHandling {
        /**
         * Handle forbidden http error
         * @param {express.Response} response: The Http Response
         */
        forbidden(response: express.Response): any;

        /**
         * Handle unauthorized http error
         * @param {express.Response} response: The Http Response
         */
        unauthorized(response: express.Response): any;
    }

    /**
     * Interface to implement a new Request Authentication
     */
    export interface RequestAuthentication {
        /**
         * Check if authentication has an authority
         * @param {string} authority: The authority
         */
        hasAuthority(authority: string): boolean;

        /**
         * Check if authentication has any of authorities
         * @param {string[]} authorities: The authorities
         */
        hasAnyAuthorities(...authorities: string[]): boolean;

        /**
         * Check if role has an authority
         * @param {string} role: The role
         */
        hasRole(role: string): boolean;

        /**
         * Check if authentication has any of roles
         * @param {string[]} roles: The roles
         */
        hasAnyRoles(...roles: string[]): boolean;

        /**
         * Check if Http Request is authenticated
         */
        isAuthenticated(): boolean;
    }

    export class RequestAuthenticationImpl implements RequestAuthentication {

        protected roles: string[];
        protected authorities: string[];

        /**
         * @param {Authentication} authentication: The authentication value.
         * @constructor
         */
        constructor(authentication: Authentication);

        /**
         * Check if authentication has an authority
         * @param {string} authority: The authority
         */
        hasAuthority(authority: string): boolean;

        /**
         * Check if authentication has any of authorities
         * @param {string[]} authorities: The authorities
         */
        hasAnyAuthorities(...authorities: string[]): boolean;

        /**
         * Check if role has an authority
         * @param {string} role: The role
         */
        hasRole(role: string): boolean;

        /**
         * Check if authentication has any of roles
         * @param {string[]} roles: The roles
         */
        hasAnyRoles(...roles: string[]): boolean;

        /**
         * Check if Http Request is authenticated
         */
        isAuthenticated(): boolean;
    }

    export class FormLogin {

        private constructor();

        /**
         * Define custom login page
         * @param url : the login page url
         */
        loginPage(url: string): this;

        /**
         * Define custom login form
         * @param url the login form url
         */
        loginUrl(url: string): this;

        /**
         * Define custom logout form
         * @param url the logout form url
         */
        logoutUrl(url: string): this;

        /**
         * Define redirect url after authentication
         * @param {string} redirectUrl: Redirect url
         */
        redirectUrl(redirectUrl: string): this;

        /**
         * and() continue to configure the AuthenticationBuilder
         */
        and(): AuthenticationBuilder;
    }

    export class AuthenticationBuilder {

        private constructor();

        stateless(): AuthenticationBuilder;

        inMemoryUser(): security.auth.impl.MemoryAuthenticator;

        tokenAuthenticationProvider(): security.auth.token.TokenAuthenticationProvider;

        jwtTokenAuthentication(secret: string): security.auth.token.jwt.JwtTokenAuthenticationProvider;

        basicAuthentication(): security.auth.impl.BasicAuthenticationProvider;

        digestAuthentication(): security.auth.impl.DigestAuthenticationProvider;

        formLogin(): FormLogin;

        errorHandling(errorHandling: AuthErrorHandling): AuthenticationBuilder;

        authenticationProvider(authenticationProvider: AuthenticationProvider): AuthenticationBuilder;

        authenticator(authenticator: Authenticator): AuthenticationBuilder;

        redirectTo(url: string): AuthenticationBuilder;
    }
}

declare namespace security.auth.impl {

    type Algorithm = "MD5" | "MD5-sess";
    type QOP = "auth" | "auth-int" | "none";

    export abstract class WebAuthenticationProvider {
        /**
         * Set WWW-Authenticate realm
         * @param {string} realm realm value
         * @return WebAuthenticationProvider
         */
        realm(realm: string): this;

        /**
         * Activate WWW-Authenticate proxy authentication
         */
        proxy(): this;

        /**
         * Get Authentication Builder config
         */
        and(): AuthenticationBuilder;
    }

    /**
     * Class for WWW-Authenticate Basic implementation
     */
    export class BasicAuthenticationProvider extends WebAuthenticationProvider {

        /**
         * Set WWW-Authenticate Digest charset
         * @param {BufferEncoding} charset: charset value
         */
        charset(charset: string): this;
    }

    /**
     * Class for WWW-Authenticate Digest implementation
     */
    export class DigestAuthenticationProvider extends WebAuthenticationProvider {
        /**
         * Set WWW-Authenticate Digest domain
         * @param {string} domain: domain value
         */
        domain(domain: string): this;

        /**
         * Activate WWW-Authenticate Digest opaque
         */
        opaque(): this;

        /**
         * Activate WWW-Authenticate Digest stale
         */
        stale(): this;

        /**
         * Set WWW-Authenticate Digest algorithm
         * @param {Algorithm} algorithm: algorithm value
         */
        algorithm(algorithm: Algorithm): this;

        /**
         * Set WWW-Authenticate Digest qop
         * @param {QOP} algorithm: qop value
         */
        qop(qop: QOP): this;
    }

    /**
     * Strategy to get a memory authenticator
     */
    export class MemoryAuthenticator {

        private constructor();

        /**
         * Add new user to memory store
         * @param {string} login: The user login
         * @param {string} password: The user password
         */
        addUser(login: string, password: string): MemoryAuthentication;

        /**
         * Set if password is digest.
         * To activate in case of digestAuthentication
         */
        digest(): MemoryAuthenticator;

        /**
         * Get AuthenticationBuilder configuration
         */
        and(): AuthenticationBuilder;
    }

    /**
     * Memory Authentication
     */
    export class MemoryAuthentication {

        /**
         * Add roles to MemoryAuthentication
         * @param {string[]} roles: The roles list.
         */
        withRoles(...roles: string[]): MemoryAuthentication;

        /**
         * Add authorities to MemoryAuthentication
         * @param {string[]} authorities: The authorities list.
         */
        withAuthorities(...authorities: string[]): MemoryAuthentication;

        /**
         * Get MemoryAuthenticator configuration
         */
        and(): MemoryAuthenticator;
    }
}

declare namespace security.auth.token {

    /**
     * Interface to implement for a token parser
     */
    export interface TokenParser {
        /**
         * Parse token
         * @param {string} token: The token value
         */
        parse(token: string): RequestAuthentication;
    }

    /**
     * Provide a token authentication provider
     */
    export class TokenAuthenticationProvider {

        /**
         * Set TokenParser
         * @param {TokenParser} tokenParser: The implemented TokenParser value
         */
        tokenParser(tokenParser: TokenParser): TokenAuthenticationProvider;

        /**
         * Set if authorization bearer
         */
        bearer(): TokenAuthenticationProvider;

        /**
         * Get AuthenticationBuilder configuration
         */
        and(): AuthenticationBuilder;
    }
}

declare namespace security.auth.token.jwt {

    /**
     * Interface to implement to extract roles and authorities from jwt token
     */
    export interface JwtAuthorization {

        /**
         * Get the authorities
         * @param {any} decoded: decoded jwt token object
         */
        getAuthorities(decoded: any): string[];

        /**
         * Get the roles
         * @param {any} decoded: decoded jwt token object
         */
        getRoles(decoded: any): string[];
    }

    /**
     * Provide a JWT token authentication provider
     */
    export class JwtTokenAuthenticationProvider extends TokenAuthenticationProvider {

        private constructor();

        /**
         * Set JwtAuthorization to extract roles and authorities from token
         * @param {JwtAuthorization} jwtAuthorization: The implemented JwtAuthorization value
         */
        jwtAuthorization(jwtAuthorization: JwtAuthorization): JwtTokenAuthenticationProvider;
    }
}

export = security;
