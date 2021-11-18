export declare enum ArgumentType {
    PATH = "path",
    QUERY = "query",
    HEADER = "header",
    BODY = "body",
    REQUEST_BODY = "request_body",
    PARAM = "param",
    REQUEST = "request",
    RESPONSE = "response",
    NEXT = "next"
}
export declare enum HttpMethod {
    GET = "get",
    HEAD = "head",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    CONNECT = "connect",
    OPTIONS = "options",
    TRACE = "trace",
    PATCH = "patch",
    ALL = "all"
}
export declare enum HttpSuccessCode {
    OK = 200,
    CREATED = 201
}
export declare enum HttpClientErrorCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404
}
export declare enum HttpServerErrorCode {
    INTERNAL_SERVER_ERROR = 500
}
