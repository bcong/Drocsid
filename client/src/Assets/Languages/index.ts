
import languages from "./languages.csv?raw";
import { LanguageCode } from "@Types/languages";
import { LanguageCodes, LanguageKey } from "./languages";

export default class Languages {
    private _languageMap: Map<string, string[]>;
    private _currentLanguage: LanguageCode;

    constructor() {
        this._languageMap = this.loadLanguages();
        this._currentLanguage = localStorage.getItem("currentLanguage") as LanguageCode || LanguageCodes.ko;
    }

    private loadLanguages = () => {
        const languageMap = new Map<string, string[]>();
        const rows = languages.split("\n").map(row => row.replace(/\r/g, ""));

        for (const i in rows) {
            // 시작과 끝은 무시
            if (Number(i) == 0 || Number(i) == rows.length - 1) {
                continue;
            }

            // 첫번째 문장에 # 이 붙어있는경우 주석을 의미함
            if (rows[i] == "" || rows[i].charAt(0) == "#" || rows[i].length == 0) {
                continue;
            }

            const row = rows[i].split(",");

            if (row[0].length == 0) {
                continue;
            }

            languageMap.set(row[0], row.slice(1, row.length));
        }

        return languageMap;
    };

    private getLanguageCodeIdx(language: LanguageCode): number {
        const allCodes = Object.values(LanguageCodes);
        return allCodes.indexOf(language);
    }

    public getCurrentLanguage = () => {
        return this._currentLanguage;
    };

    public changeCurrentLanguage = (language: LanguageCode) => {
        this._currentLanguage = language;
        localStorage.setItem("currentLanguage", language);
    };

    public getTranslationKey = (key: LanguageKey) => {
        const strings = this._languageMap.get(key);
        if (!strings) {
            return '';
        }

        const index = this.getLanguageCodeIdx(this._currentLanguage);
        return strings[index];
    };
} 