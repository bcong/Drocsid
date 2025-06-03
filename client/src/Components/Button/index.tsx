import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import Tip from "@Components/Tip";
import Label from "@Components/Label";

interface I_Props {
    label?: LanguageKey
    text: LanguageKey | JSX.Element
    required?: boolean
    tips?: { tip: LanguageKey, cb?: () => void }[]
    marginTop?: number
    marginBottom?: number
    disabled?: boolean
    onClick?: () => void
}

const Button: React.FC<I_Props> = ({
    label,
    text,
    required,
    tips,
    marginTop,
    marginBottom,
    disabled,
    onClick
}) => {
    const mainStore = useMainStore();

    return (
        <div className={styles.ButtonBox} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
            {label && <Label label={label} required={required} />}
            <button className={disabled ? styles.Disabled : undefined} onClick={onClick}>
                <p>{typeof text == "string" ? mainStore.translate(text) : text}</p>
            </button>
            {tips && <Tip tips={tips} marginTop={8} />}
        </div>
    );
};

export default Button;