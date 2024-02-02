import { useState } from "react";
import styles from "../style.module.less";
import { useMainStore } from "@Stores/index";
import Input from "@Components/Input";
import { classes, getDays, getMonths, getYears, isValidDate, isValidEmail, isValidUsername } from "@Utils/index";
import Tip from "@Components/Tip";
import Select from "@Components/Select";
import Button from "@Components/Button";
import Label from "@Components/Label";
import Loading from "@Assets/Svg/3-dots-fade.svg";

interface I_Props {
    viewSignUp: null | boolean
    IsViewSignUp: React.Dispatch<React.SetStateAction<null | boolean>>
}

const SignUp: React.FC<I_Props> = ({
    viewSignUp,
    IsViewSignUp
}) => {
    const mainStore = useMainStore();
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        nickname: "",
        username: "",
        password: "",
        confirm_password: "",
        year: "",
        month: "",
        day: "",
    });

    const [signUpInfoState, setSignUpInfoState] = useState(new Map());
    const [isSigningUp, IsSigningUp] = useState(false);

    const passwordLength = { max: 20, min: 8 };
    const usernameLength = { max: 20, min: 4 };
    const currentYear = new Date().getFullYear();
    const dateOptions = { year: getYears(currentYear, 150, 3), month: getMonths(), day: getDays() };

    const deleteSignUpInfoState = (key: string) => {
        key = (key == "month" || key == "day") ? "year" : key;

        const updateSignUpInfoState = new Map(signUpInfoState);
        updateSignUpInfoState.delete(key);
        setSignUpInfoState(updateSignUpInfoState);
    };

    const updateSignUpInfo = (key: string, value: string) => {
        setSignUpInfo({ ...signUpInfo, [key]: value });
        deleteSignUpInfoState(key);
    };

    const handleSingUp = () => {
        if (isSigningUp) return;

        const signUpInfoState = new Map();
        for (const [key, value] of Object.entries(signUpInfo)) {
            if (key == "nickname" || key == "month" || key == "day") continue;

            if (value.length == 0) {
                signUpInfoState.set(key, mainStore.translate("REQUIREMENTS"));
                continue;
            }

            if (key == "email" && !isValidEmail(value)) {
                signUpInfoState.set(key, mainStore.translate("SIGNPAGE_LEGITIMATE_EMAIL_ADDRESS"));
                continue;
            }

            if (key == "year" && !isValidDate(Number(signUpInfo.year), Number(signUpInfo.month), Number(signUpInfo.day))) {
                signUpInfoState.set(key, mainStore.translate("SIGNPAGE_VALID_DATE_BIRTH"));
                continue;
            }

            if (key == "username") {
                if (!(value.length >= usernameLength.min && value.length <= usernameLength.max)) {
                    signUpInfoState.set(key, mainStore.translate("BETWEEN_CHARACTERS", [usernameLength.min, usernameLength.max]));
                    continue;
                }

                if (!isValidUsername(value)) {
                    signUpInfoState.set(key, mainStore.translate("SIGNPAGE_USERNAME_TIP"));
                    continue;
                }
            }

            if (key == "password") {
                if (!(value.length >= passwordLength.min && value.length <= passwordLength.max)) {
                    signUpInfoState.set(key, mainStore.translate("BETWEEN_CHARACTERS", [passwordLength.min, passwordLength.max]));
                    continue;
                }
            }

            if (key == "confirm_password") {
                if (signUpInfo.password != value) {
                    signUpInfoState.set(key, mainStore.translate("NOT_MATCH_PASSWORD"));
                    continue;
                }
            }
        }

        setSignUpInfoState(signUpInfoState);

        if (signUpInfoState.size == 0) {
            IsSigningUp(true);
        }
    };

    return (
        <div className={classes(styles.SignForm, viewSignUp == null ? null : viewSignUp ? styles.View : styles.Hide)}>
            <div className={classes(styles.Section)}>
                <div className={styles.Header}>
                    <p className={styles.Big}>{mainStore.translate("CREATE_ACCOUNT")}</p>
                </div>
                <div className={styles.Contents}>
                    <Label label={"EMAIL"} required={true} marginBottom={6} errorMsg={signUpInfoState.get("email")} />
                    <Input type={"email"} value={signUpInfo.email} onChange={(e) => updateSignUpInfo("email", e)} marginBottom={20} disabled={isSigningUp ? true : false} />

                    <Label label={"NICKNAME"} required={false} marginBottom={6} />
                    <Input type={"text"} value={signUpInfo.nickname} onChange={(e) => updateSignUpInfo("nickname", e)} marginBottom={20} focusTips={[{ tip: "SIGNPAGE_NICKNAME_TIP" }]} disabled={isSigningUp ? true : false} />

                    <Label label={"USERNAME"} required={true} marginBottom={6} errorMsg={signUpInfoState.get("username")} />
                    <Input type={"text"} max={usernameLength.max} min={usernameLength.min} value={signUpInfo.username} onChange={(e) => updateSignUpInfo("username", e)} marginBottom={20} focusTips={[{ tip: "SIGNPAGE_USERNAME_TIP" }]} disabled={isSigningUp ? true : false} />

                    <Label label={"PASSWORD"} required={true} marginBottom={6} errorMsg={signUpInfoState.get("password")} />
                    <Input type={"password"} max={passwordLength.max} min={passwordLength.min} value={signUpInfo.password} onChange={(e) => updateSignUpInfo("password", e)} marginBottom={20} disabled={isSigningUp ? true : false} />

                    <Label label={"CONFIRM_PASSWORD"} required={true} marginBottom={6} errorMsg={signUpInfoState.get("confirm_password")} />
                    <Input type={"password"} max={passwordLength.max} min={passwordLength.min} value={signUpInfo.confirm_password} onChange={(e) => updateSignUpInfo("confirm_password", e)} marginBottom={20} disabled={isSigningUp ? true : false} />

                    <Label label={"DATE_BIRTH"} required={true} marginBottom={6} errorMsg={signUpInfoState.get("year")} />
                    <div className={styles.Selects}>
                        <Select placeholder={"YEAR"} value={signUpInfo.year} options={dateOptions.year} onChange={(e) => updateSignUpInfo("year", e)} disabled={isSigningUp ? true : false} />
                        <Select placeholder={"MONTH"} value={signUpInfo.month} options={dateOptions.month} onChange={(e) => updateSignUpInfo("month", e)} disabled={isSigningUp ? true : false} />
                        <Select placeholder={"DAY"} value={signUpInfo.day} options={dateOptions.day} onChange={(e) => updateSignUpInfo("day", e)} disabled={isSigningUp ? true : false} />
                    </div>

                    <Button text={isSigningUp ? <img src={Loading} /> : "CONTINUE"} onClick={handleSingUp} marginTop={20} marginBottom={20} disabled={isSigningUp ? true : false} />
                    {!isSigningUp && <Tip tips={[{ tip: "SIGNPAGE_ALREADY_ACCOUNT", size: 16, bold: true, cb: () => IsViewSignUp(false) }]} />}
                </div>
            </div>
        </div>
    );
};

export default SignUp;