
import { makeObservable, observable, action, computed } from "mobx";

export default class MainStore {
    @observable
    private _view = "MAIN";

    constructor() {
        makeObservable(this);
    }

    @action
    setViewPage = (page: string) => {
        this._view = page;
    };

    @computed
    get view() {
        return this._view;
    }
}
