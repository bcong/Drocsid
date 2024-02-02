import { useState } from "react";
import styles from "../style.module.less";
import { useMainStore } from "@Stores/index";
import Button from "@Components/Button";
import Input from "@Components/Input";
import { classes } from "@Utils/index";
import Label from "@Components/Label";

interface I_Props {
    viewSignUp: null | boolean
    IsViewSignUp: React.Dispatch<React.SetStateAction<null | boolean>>
}

const SignIn: React.FC<I_Props> = ({
    viewSignUp,
    IsViewSignUp
}) => {
    const mainStore = useMainStore();
    const [signInInfo, setSignInInfo] = useState({
        email: "",
        password: ""
    });

    const setEmail = (email: string) => {
        setSignInInfo({ ...signInInfo, email: email });
    };

    const setPassword = (password: string) => {
        setSignInInfo({ ...signInInfo, password: password });
    };

    const resetPassword = () => {
        console.log("resetPassword");
    };

    return (
        <div className={classes(styles.SignForm, viewSignUp ? styles.Hide : styles.View)}>
            <div className={styles.Section}>
                <div className={styles.Header}>
                    <p className={styles.Big}>{mainStore.translate("SIGNPAGE_HEADER_TITLE")}</p>
                    <p className={styles.Small}>{mainStore.translate("SIGNPAGE_HEADER_SUBTITLE")}</p>
                </div>
                <div className={styles.Contents}>
                    <Label label={"EMAIL"} required={true} marginBottom={6} />
                    <Input type={"email"} value={signInInfo.email} onChange={setEmail} marginBottom={20} />

                    <Label label={"PASSWORD"} required={true} marginBottom={6} />
                    <Input type={"password"} value={signInInfo.password} marginBottom={20} tips={[{ tip: "SIGNPAGE_FORGOT_PASSWORD", cb: resetPassword }]} onChange={setPassword} />
                    <Button text={"LOGIN"} tips={[{ tip: "SIGNPAGE_NEED_ACCOUNT" }, { tip: "REGISTER", cb: () => IsViewSignUp(true) }]} />
                </div>
            </div>
        </div>
    );
};

export default SignIn;