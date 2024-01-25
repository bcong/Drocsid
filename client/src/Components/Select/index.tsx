import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import { classes } from "@Utils/index";
import Label from "@Components/Label";
import { useEffect, useRef, useState } from "react";

interface I_Props {
    label?: LanguageKey
    required?: boolean
    value: string | number
    options: { id: number, label: string | number }[]
    placeholder?: LanguageKey
    onChange: (value: string) => void
}

const Select: React.FC<I_Props> = ({
    label,
    required,
    value,
    options,
    placeholder,
    onChange
}) => {
    const mainStore = useMainStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const selectedRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const node = selectedRef.current;
        if (node) {
            node.scrollIntoView({
                behavior: 'instant',
                block: 'start'
            });
        }
    }, [isFocused]);

    useEffect(() => {
        const node = inputRef.current;
        if (node) {
            const handleFocus = () => {
                setIsFocused(true);
            };

            const handleBlur = () => {
                setInputValue("");
                setIsFocused(false);
            };

            node.addEventListener('focus', handleFocus);
            node.addEventListener('blur', handleBlur);

            return () => {
                node.removeEventListener('focus', handleFocus);
                node.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

    const handleIconMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        const input = inputRef.current;
        if (input) document.activeElement === input ? input.blur() : input.focus();
    };

    const optionElem = options.map(({ id, label }) => {
        const regex = new RegExp('^' + inputValue);

        if (!regex.test(String(label))) return;

        return (
            <div key={id}
                ref={value == label ? selectedRef : null}
                className={classes(styles.Option, label == value ? styles.Selection : null)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(String(label));
                    inputRef.current && inputRef.current.blur();
                }}>
                <p>{label}</p>
            </div>
        );
    });

    let optionsElem;
    const optionLen = optionElem.filter(el => el !== undefined).length;
    if (isFocused && optionLen == 0) {
        optionsElem = (
            <div className={styles.Options}>
                <div className={styles.NoSearchResult}>
                    <p>{mainStore.translate("SELECT_NO_SEARCH_RESULTS")}</p>
                </div>
            </div>
        );
    } else if (isFocused) {
        optionsElem = (
            <div className={styles.Options}>
                {optionElem}
            </div>
        );
    }

    const translatedPlaceholder = value ? String(value) : placeholder && mainStore.translate(placeholder);

    return (
        <div className={styles.SelectBox}>
            {label && <Label label={label} required={required} />}
            <div className={styles.Select}>
                <input ref={inputRef}
                    placeholder={translatedPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <i className="fi fi-sr-angle-small-down" onMouseDown={handleIconMouseDown} />
            </div>
            {optionsElem}
        </div>
    );
};

export default Select;