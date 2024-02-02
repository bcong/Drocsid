import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import Tip from "@Components/Tip";
import { useState, useEffect, useRef } from "react";

interface I_Props {
    value: string
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: LanguageKey
    focusTips?: { tip: LanguageKey, cb?: () => void, color?: string }[]
    tips?: { tip: LanguageKey, cb?: () => void, color?: string }[]
    max?: number
    min?: number
    marginTop?: number
    marginBottom?: number
    disabled?: boolean
    onChange?: (value: string) => void
}

const Input: React.FC<I_Props> = ({
    value,
    type,
    placeholder,
    focusTips,
    tips,
    max,
    min,
    marginTop,
    marginBottom,
    disabled,
    onChange
}) => {
    const mainStore = useMainStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const node = inputRef.current;
        if (node) {
            const handleFocus = () => {
                setIsFocused(true);
            };

            const handleBlur = () => {
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

    return (
        <div className={styles.InputBox} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
            <input
                disabled={disabled}
                ref={inputRef}
                maxLength={max}
                minLength={min}
                value={value}
                placeholder={placeholder && mainStore.translate(placeholder)}
                type={type}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            {focusTips && <Tip tips={focusTips} animation={true} view={isFocused} marginTop={8} />}
            {tips && <Tip tips={tips} marginTop={6} />}
        </div>
    );
};

export default Input;