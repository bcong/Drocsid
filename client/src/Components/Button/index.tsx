import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import Tip from "@Components/Tip";
import Label from "@Components/Label";

interface I_Props {
    label?: LanguageKey
    text: LanguageKey
    required?: boolean
    tips?: { tip: LanguageKey, cb?: () => void }[]
    onClick?: () => void
}

const Button: React.FC<I_Props> = ({
    label,
    text,
    required,
    tips,
    onClick
}) => {
    const mainStore = useMainStore();

    return (
        <div className={styles.ButtonBox}>
            {label && <Label label={label} required={required} />}
            <button onClick={onClick}>
                <p>{mainStore.translate(text)}</p>
            </button>
            {tips && <Tip tips={tips} />}
        </div>
    );
};

export default Button;