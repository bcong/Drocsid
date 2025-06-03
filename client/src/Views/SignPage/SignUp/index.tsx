import { useState } from "react";
import styles from "../style.module.less";
import { useMainStore } from "@Stores/index";
import Input from "@Components/Input";
import { classes } from "@Utils/index";
import Tip from "@Components/Tip";
import Select from "@Components/Select";
import Button from "@Components/Button";

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
        username: "",
        password: "",
        year: "",
        month: "",
        day: "",
    });
    const [singUpInfoVaild, setSingUpInfoVaild] = useState({
        email: "",
        username: "",
        password: "",
        year: "",
        month: "",
        day: "",
    });

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 150 }, (_, index) => {
        return { id: index, label: (currentYear - 3) - index };
    });

    const monthOptions = Array.from({ length: 12 }, (_, index) => {
        return { id: index, label: index + 1 };
    });

    const dayOptions = Array.from({ length: 31 }, (_, index) => {
        return { id: index, label: index + 1 };
    });

    const setEmail = (email: string) => {
        setSignUpInfo({ ...signUpInfo, email: email });
    };

    const setPassword = (password: string) => {
        setSignUpInfo({ ...signUpInfo, password: password });
    };

    const setYear = (year: string) => {
        setSignUpInfo({ ...signUpInfo, year: year });
    };

    const setMonth = (month: string) => {
        setSignUpInfo({ ...signUpInfo, month: month });
    };

    const setDay = (day: string) => {
        setSignUpInfo({ ...signUpInfo, day: day });
    };

    const handleSingUp = () => {

    };

    return (
        <div className={classes(styles.SignForm, viewSignUp == null ? null : viewSignUp ? styles.View : styles.Hide)}>
            <div className={styles.Section}>
                <div className={styles.Header}>
                    <p className={styles.Big}>{mainStore.translate("CREATE_ACCOUNT")}</p>
                </div>
                <div className={styles.Contents}>
                    <Input type={"email"} label={"EMAIL"} value={signUpInfo.email} required={true} onChange={setEmail} />
                    <Input type={"text"} label={"USERNAME"} value={signUpInfo.username} required={true} onChange={setPassword} />
                    <Input type={"password"} label={"PASSWORD"} value={signUpInfo.password} required={true} onChange={setPassword} />
                    <div className={styles.Selects}>
                        <Select label={"DATE_BIRTH"} required={true} placeholder={"YEAR"} value={signUpInfo.year} options={yearOptions} onChange={setYear} />
                        <Select required={true} placeholder={"MONTH"} value={signUpInfo.month} options={monthOptions} onChange={setMonth} />
                        <Select required={true} placeholder={"DAY"} value={signUpInfo.day} options={dayOptions} onChange={setDay} />
                    </div>
                    <Button text={"CONTINUE"} onClick={handleSingUp} />
                    <Tip tips={[{ tip: "SIGNPAGE_ALREADY_ACCOUNT", size: 16, bold: true, cb: () => IsViewSignUp(false) }]} />
                </div>
            </div>
        </div>
    );
};

export default SignUp;