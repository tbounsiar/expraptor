import { NextHandleFunction } from "connect";
/**
 * Object to define the router options
 * @type RouterOption
 */
export default interface RouterOption {
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
}
