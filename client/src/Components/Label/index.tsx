import styles from "./style.module.less";
import { useMainStore } from "@Stores/index";
import { LanguageKey } from "@Assets/Languages/languages";
import { classes } from "@Utils/index";
import React from "react";

interface I_Props {
    label: LanguageKey
    required?: boolean
    errorMsg?: string
    marginTop?: number
    marginBottom?: number
}

const Label: React.FC<I_Props> = ({
    label,
    required,
    errorMsg,
    marginTop,
    marginBottom
}) => {
    const mainStore = useMainStore();

    return (
        <div className={classes(styles.Label, errorMsg ? styles.Error : required ? styles.Required : null)} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
            <p>
                {mainStore.translate(label)}
                {errorMsg && <React.Fragment><span>-</span><span>{errorMsg}</span></React.Fragment>}
            </p>
        </div>
    );
};

export default Label;