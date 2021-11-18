import { HttpMethod } from "../util/enum";
import { NextHandleFunction } from "connect";
import { HttpStatusCode, ResponseHeader } from "../util/type";
export default interface RouteOption {
    path: string;
    method?: HttpMethod;
    headers?: Record<ResponseHeader | string, string>;
    status?: HttpStatusCode;
    format?: "json" | "xml";
    middlewares?: NextHandleFunction[];
}
