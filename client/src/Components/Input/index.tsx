import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import Tip from "@Components/Tip";
import Label from "@Components/Label";

interface I_Props {
    value: string
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    label?: LanguageKey
    placeholder?: LanguageKey
    required?: boolean
    tips?: { tip: LanguageKey, cb?: () => void }[]
    onChange?: (value: string) => void
}

const Input: React.FC<I_Props> = ({
    value,
    type,
    label,
    placeholder,
    required,
    tips,
    onChange
}) => {
    const mainStore = useMainStore();

    return (
        <div className={styles.InputBox}>
            {label && <Label label={label} required={required} />}
            <input
                value={value}
                placeholder={placeholder && mainStore.translate(placeholder)}
                type={type}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            {tips && <Tip tips={tips} />}
        </div>
    );
};

export default Input;