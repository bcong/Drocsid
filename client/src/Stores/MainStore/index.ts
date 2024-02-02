import { makeObservable, observable, action, computed } from "mobx";
import Languages from '@Assets/Languages';
import { LanguageCode } from "@Types/languages";
import { LanguageKey } from "@Assets/Languages/languages";

export default class MainStore {
    @observable
    private _viewPage = "";

    @observable
    private _languages = new Languages();

    constructor() {
        makeObservable(this);
    }

    @action
    setViewPage = (page: string) => {
        this._viewPage = page;
    };

    @action
    setCurrentLanguage = (language: LanguageCode) => {
        this._languages.changeCurrentLanguage(language);
    };

    @action
    translate = (key: LanguageKey, options?: number[] | string[]) => {
        return this._languages.getTranslationKey(key, options);
    };

    @computed
    get view() {
        return this._viewPage;
    }

    @computed
    get currentLanguage() {
        return this._languages.getCurrentLanguage();
    }
}
