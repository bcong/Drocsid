import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import { classes } from "@Utils/index";

interface I_Props {
    tips?: { tip: LanguageKey, size?: number, color?: string, bold?: boolean, cb?: () => void }[]
    marginTop?: number
    marginBottom?: number
    animation?: boolean
    view?: boolean
}

const Tip: React.FC<I_Props> = ({
    tips,
    marginTop,
    marginBottom,
    animation,
    view,
}) => {
    const mainStore = useMainStore();

    let tipElem;
    if (tips) {
        tipElem = tips.map(({ tip, size, color, bold, cb }) => {
            return (
                <div key={tip} className={classes(styles.Tip, cb ? styles.Button : null)} onClick={cb && cb}>
                    <p style={{ fontSize: size ? `${size}px` : '14px', fontWeight: bold ? 600 : 500, color: color }}>{mainStore.translate(tip)}</p>
                </div>
            );
        });
    }

    return (
        <div className={classes(styles.Tips, animation ? styles.Animation : null, view ? styles.View : styles.Hide)} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
            {tipElem}
        </div>
    );
};

export default Tip;