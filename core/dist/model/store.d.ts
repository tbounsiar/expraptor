import Route from "./route";
import RouterOption from "./routerOption";
export default interface Store {
    _router$?: RouterOption;
    _routes$?: Record<string | symbol, Route>;
}
