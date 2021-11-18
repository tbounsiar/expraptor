import { ArgumentType } from "../util/enum";
export default interface Argument {
    type: ArgumentType;
    key: string;
    index: number;
}
