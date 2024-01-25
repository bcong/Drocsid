import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import { classes } from "@Utils/index";

interface I_Props {
    label: LanguageKey
    required?: boolean
}

const Label: React.FC<I_Props> = ({
    label,
    required,
}) => {
    const mainStore = useMainStore();

    return (
        <div className={classes(styles.Label, required ? styles.Required : null)}>
            <p>{mainStore.translate(label)}</p>
        </div>
    );
};

export default Label;