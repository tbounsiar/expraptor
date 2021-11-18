import express from "express";
import {Configurator} from "./index";
import {HttpMethod} from "@expraptor/core";

declare function security(application: express.Express): Configurator;

declare namespace security {

    /**
     * Decorator for specifying a method access-control expression which will be evaluated to decide whether a method invocation is allowed or not.
     * @param {string} authorization: The method access-control expression
     * @constructor
     */
    export function PreAuthorize(authorization: string): MethodDecorator;

    export class Configurator {

        private constructor();

        httpSecurity(): security.http.HttpSecurity;

        buildAuth(): security.auth.AuthenticationBuilder;

        enable();
    }

    export interface SecurityConfigurator {

        http(http: security.http.HttpSecurity);

        auth(builder: security.auth.AuthenticationBuilder);
    }
}

declare namespace security.http {

    export class AuthorizeRequests {

        private constructor();

        requestMatcher(...regex: string[]): RequestMatcher;

        anyRequest(): RequestMatcher;
    }

    export class HttpSecurity {

        private constructor();

        authorize(): AuthorizeRequests;

        cors(): HttpSecurity;
    }

    export class RequestMatcher {

        private constructor();

        /**
         * Set the matching request http methods
         * @param methods one or multiple http method
         */
        withMethod(...methods: HttpMethod[]): RequestMatcher;

        /**
         *
         */
        permitAll(): AuthorizeRequests;

        authenticated(): AuthorizeRequests;

        hasRole(role: string): RequestMatcher;

        hasAnyRoles(...roles: string[]): RequestMatcher;

        hasAuthority(authority: string): RequestMatcher;

        hasAnyAuthorities(...authorities: string[]): RequestMatcher;

        and(): AuthorizeRequests;
    }
}

declare namespace security.auth {

    export interface Authentication {
        login: string;
        authorities: string[];
        roles: string[];
    }

    export interface AuthenticationProvider {

        getAuthentication(request: express.Request): RequestAuthentication;

        setAuthentication?(request: express.Request, authentication: Authentication);
    }

    export class RequestAuthenticationImpl implements RequestAuthentication {

        protected roles: string[];
        protected authorities: string[];

        constructor(authentication: Authentication);

        hasAnyAuthorities(...authorities: string[]): boolean;

        hasAnyRoles(...roles: string[]): boolean;

        hasAuthority(authority: string): boolean;

        hasRole(role: string): boolean;

        isAuthenticated(): boolean;
    }

    export interface Authenticator {
        authenticate(login: string, password: string): Authentication;
    }

    export interface AuthErrorHandling {

        forbidden(response: express.Response): any;

        unauthorized(response: express.Response): any;
    }

    export interface RequestAuthentication {

        hasAuthority(authority: string): boolean;

        hasAnyAuthorities(...authorities: string[]): boolean;

        hasRole(role: string): boolean;

        hasAnyRoles(...roles: string[]): boolean;

        isAuthenticated(): boolean;
    }

    export class FormLogin {

        private constructor();

        /**
         * Define custom login page
         * @param url : the login page url
         */
        loginPage(url: string): FormLogin;

        /**
         * Define custom login form
         * @param url the login form url
         */
        loginUrl(url: string): FormLogin;

        /**
         * Define custom logout form
         * @param url the logout form url
         */
        logoutUrl(url: string): FormLogin;

        /**
         * and() continue to configure the AuthenticationBuilder
         */
        and(): AuthenticationBuilder;
    }

    export class AuthenticationBuilder {

        private constructor();

        stateless(): AuthenticationBuilder;

        inMemoryUser(): security.auth.impl.MemoryAuthenticator;

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

    export class BasicAuthenticationProvider {

        realm(realm: string): BasicAuthenticationProvider;

        charset(charset: string): BasicAuthenticationProvider;

        proxy(): DigestAuthenticationProvider;

        and(): AuthenticationBuilder;
    }

    export class DigestAuthenticationProvider {

        realm(realm: string): DigestAuthenticationProvider;

        domain(domain: string): DigestAuthenticationProvider;

        nonce(nonce: string): DigestAuthenticationProvider;

        opaque(opaque: string): DigestAuthenticationProvider;

        stale(): DigestAuthenticationProvider;

        algorithm(algorithm: Algorithm): DigestAuthenticationProvider;

        qop(qop: QOP): DigestAuthenticationProvider;

        proxy(): DigestAuthenticationProvider;

        and(): AuthenticationBuilder;
    }

    export class MemoryAuthenticator {

        private constructor();

        addUser(login: string, password: string): MemoryAuthentication;

        digest(): MemoryAuthenticator;

        and(): AuthenticationBuilder;
    }

    export class MemoryAuthentication {

        withRoles(...roles: string[]): MemoryAuthentication;

        withAuthorities(...authorities: string[]): MemoryAuthentication;

        and(): MemoryAuthenticator;
    }
}

declare namespace security.auth.token {

    export interface TokenParser {
        parse(token: string): RequestAuthentication;
    }

    export abstract class TokenAuthenticationProvider {

        tokenParser(tokenParser: TokenParser): TokenAuthenticationProvider;

        bearer(): TokenAuthenticationProvider;

        and(): AuthenticationBuilder;
    }
}

declare namespace security.auth.token.jwt {

    export interface JwtAuthorization {

        getAuthorities(decoded: any): string[];

        getRoles(decoded: any): string[];
    }

    export class JwtTokenAuthenticationProvider extends TokenAuthenticationProvider {

        private constructor();

        jwtAuthorization(jwtAuthorization: JwtAuthorization): JwtTokenAuthenticationProvider;
    }
}

export = security;
