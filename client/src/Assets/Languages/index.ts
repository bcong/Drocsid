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
            if (Number(i) === 0 || Number(i) === rows.length - 1) {
                continue;
            }

            // 첫 번째 문장에 # 이 붙어 있는 경우 주석을 의미함
            if (rows[i] === "" || rows[i].charAt(0) === "#" || rows[i].length === 0) {
                continue;
            }

            // 쌍따옴표로 묶인 부분을 올바르게 처리하기 위한 정규식
            const regex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
            const row = [];
            let match;
            while ((match = regex.exec(rows[i])) !== null) {
                // 쌍따옴표 제거 및 더블 쌍따옴표를 싱글 쌍따옴표로 변환
                let value = match[1];
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1).replace(/""/g, '"');
                }
                row.push(value);
            }

            if (row[0].length === 0) {
                continue;
            }

            languageMap.set(row[0], row.slice(1).map(item => item.trim()));
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

    public getTranslationKey = (key: LanguageKey, options?: number[] | string[]) => {
        const strings = this._languageMap.get(key);
        if (!strings) {
            return '';
        }

        const index = this.getLanguageCodeIdx(this._currentLanguage);
        let string = strings[index];

        if (options) {
            for (const option of options) {
                string = string.replace("{{option}}", String(option));
            }
        }

        return string;
    };
} 