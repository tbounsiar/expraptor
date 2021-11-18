import {HttpMethod, HttpStatusCode, RequestHeader, ResponseHeader} from "@expraptor/core";
import {NextHandleFunction} from "connect";

declare namespace web {

    /**
     * Object to define the router options
     * @type RouterOption
     */
    export type RouterOption = {
        /**
         * The HTTP router path
         * @type {string}
         */
        path: string;
        /**
         * Router Middlewares
         * @type {NextHandleFunction[]}
         */
        middlewares?: NextHandleFunction[];
    };

    /**
     * Object to define the route options
     */
    export type RouteOption = {
        /**
         * The HTTP route path
         */
        path: string;
        /**
         * The HTTP route method
         */
        method?: HttpMethod;
        /**
         * The headers will be added the route response
         */
        headers?: Record<ResponseHeader | string, string>;
        /**
         * The status of the route response
         */
        status?: HttpStatusCode;
        /**
         * @Beta
         * Format of response
         */
        format?: "json" | "xml";
        /**
         * Middlewares of the route
         */
        middlewares?: NextHandleFunction[];
    };

    /**
     * View class to use template engine
     */
    export class View {

        /**
         *
         * @param _name {string} template view file name.
         * @param _callback {(err: Error, html: string) => void} rendering callback function.
         * @constructor
         */
        constructor(_name: string, _callback?: (err: Error, html: string) => void);

        /**
         * Set option
         * @param key {string} option key
         * @param value {string} option value
         */
        set(key: string, value: string): void;
    }

    /**
     * Class to allow deploying of server
     */
    export class Server {

        /**
         * Create instance of server
         * @param port Listening port
         */
        constructor(port: number);

        /**
         * Register a decorated Router class
         * @param router the decorated Router class or its instance
         */
        register(route: any): void;

        /**
         * Set template view engine
         * @param engine the view engine, ex: ejs, pug
         * @param path the views dir path
         */
        setViewEngine(engine: string, path: string): void;

        /**
         * Enable security using @expraptor/security
         * @param configurator instance of SecurityConfiguratorImpl class that implement @expraptor/security.SecurityConfigurator
         */
        enableSecurity(configurator: any): void;

        /**
         * Ass middleware to app, its like app.use(middleware)
         * @param middleware: the middleware
         */
        use(middleware: any): void;

        /**
         * Start to deploy the server
         */
        start(): void;
    }

    export function Router(option: RouterOption): ClassDecorator;

    /**
     * Decorator for mapping HTTP requests onto specific handler methods.
     * @param {RouteOption} HTTP mapping option
     * @constructor
     */
    export function Route(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP GET requests onto specific handler methods.
     * @param {RouteOption} option HTTP GET mapping option
     * @constructor
     */
    export function GET(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP POST requests onto specific handler methods.
     * @param {RouteOption} option HTTP POST mapping option
     * @constructor
     */
    export function POST(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP PUT requests onto specific handler methods.
     * @param {RouteOption} option HTTP PUT mapping option
     * @constructor
     */
    export function PUT(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP PATCH requests onto specific handler methods.
     * @param {RouteOption} option HTTP PATCH mapping option
     * @constructor
     */
    export function PATCH(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP DELETE requests onto specific handler methods.
     * @param {RouteOption} option HTTP DELETE mapping option
     * @constructor
     */
    export function DELETE(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP OPTIONS requests onto specific handler methods.
     * @param {import("@expraptor/core").RouteOption} option HTTP OPTIONS mapping option
     * @constructor
     */
    export function OPTIONS(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP HEAD requests onto specific handler methods.
     * @param {RouteOption} option HTTP HEAD mapping option
     * @constructor
     */
    export function HEAD(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP TRACE requests onto specific handler methods.
     * @param {RouteOption} option HTTP TRACE mapping option
     * @constructor
     */
    export function TRACE(option: RouteOption): MethodDecorator;
    /**
     * Decorator for mapping HTTP CONNECT requests onto specific handler methods.
     * @param {import("@expraptor/core").RouteOption} option HTTP CONNECT mapping option
     * @constructor
     */
    export function CONNECT(option: RouteOption): MethodDecorator;
    /**
     * Decorator indicating a method parameter should be bound to the body of the web request.
     * The body of the request is passed to resolve the method argument depending on the content type of the request.
     * Supported for decorated handler methods.
     * @constructor
     */
    export function RequestBody(): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web request header.
     * Supported for decorated handler methods.
     * @param {RequestHeader | string} key The key of the request header to bind to.
     * @constructor
     */
    export function Header(key: RequestHeader | string): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web request query parameter.
     * Supported for decorated handler methods.
     * @param {string} key The key of the request query parameter to bind to.
     * @constructor
     */
    export function QueryParam(key?: string): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a URI template variable.
     * Supported for decorated handler methods.
     * @param {string} key The key of the path variable to bind to.
     * @constructor
     */
    export function Path(key?: string): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web request body parameter.
     * Supported for decorated handler methods.
     * @param {string} key The key of the request body parameter to bind to.
     * @constructor
     */
    export function BodyParam(key?: string): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web request parameter.
     * Supported for decorated handler methods.
     * @param {string} key The key of the request parameter to bind to.
     * @constructor
     */
    export function Param(key?: string): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web request.
     * Supported for decorated handler methods.
     * @constructor
     */
    export function Request(): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a web response.
     * Supported for decorated handler methods.
     * @constructor
     */
    export function Response(): ParameterDecorator;
    /**
     * Decorator which indicates that a method parameter should be bound to a next function.
     * Supported for decorated handler methods.
     * @constructor
     */
    export function Next(): ParameterDecorator;
}

export = web;
