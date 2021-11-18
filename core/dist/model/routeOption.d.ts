import { HttpMethod } from "../util/enum";
import { NextHandleFunction } from "connect";
import { HttpStatusCode, ResponseHeader } from "../util/type";
/**
 * Object to define the route options
 */
export default interface RouteOption {
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
}
