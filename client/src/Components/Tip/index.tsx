import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import { classes } from "@Utils/index";

interface I_Props {
    tips?: { tip: LanguageKey, size?: number, bold?: boolean, cb?: () => void }[]
}

const Tip: React.FC<I_Props> = ({
    tips,
}) => {
    const mainStore = useMainStore();

    let tipElem;
    if (tips) {
        tipElem = tips.map(({ tip, size, bold, cb }) => {
            return (
                <div key={tip} className={classes(styles.Tip, cb ? styles.Button : null)} onClick={cb && cb}>
                    <p style={{ fontSize: size ? `${size}px` : '14px', fontWeight: bold ? 600 : 500 }}>{mainStore.translate(tip)}</p>
                </div>
            );
        });
    }

    return (
        <div className={styles.Tips}>
            {tipElem}
        </div>
    );
};

export default Tip;