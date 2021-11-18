import { NextHandleFunction } from "connect";
export default interface RouterOption {
    path: string;
    middlewares?: NextHandleFunction[];
}
