import { HttpMethod } from "../util/enum";
import Argument from "./argument";
import { NextHandleFunction } from "connect";
export default interface Route {
    method?: HttpMethod;
    path?: string;
    handler?: Function;
    arguments?: Argument[];
    authorization?: string;
    middlewares?: NextHandleFunction[];
}
