/**
 * The routes arguments types
 * @enum
 */
export declare enum ArgumentType {
    /**
     * Request Path Variable Type
     */
    PATH = "path",
    /**
     * Request Query Parameter Type
     */
    QUERY = "query",
    /**
     * Request Header Type
     */
    HEADER = "header",
    /***
     * Body Param Type
     */
    BODY = "body",
    /**
     * Request Body Type
     */
    REQUEST_BODY = "request_body",
    /**
     * Request Param Type
     */
    PARAM = "param",
    /**
     * Http Request Type
     */
    REQUEST = "request",
    /**
     * Http Response Type
     */
    RESPONSE = "response"
}
/**
 * Http Methods
 * @enum
 */
export declare enum HttpMethod {
    ALL = "all",
    DELETE = "delete",
    GET = "get",
    HEAD = "head",
    OPTIONS = "options",
    PATCH = "patch",
    POST = "post",
    PUT = "put",
    TRACE = "trace"
}
/**
 * Http Success Code
 * @enum
 */
export declare enum HttpSuccessCode {
    OK = 200,
    CREATED = 201
}
/**
 * Http Error Code
 * @enum
 */
export declare enum HttpClientErrorCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404
}
/**
 * Http Server Error Codes
 * @enum
 */
export declare enum HttpServerErrorCode {
    INTERNAL_SERVER_ERROR = 500
}
