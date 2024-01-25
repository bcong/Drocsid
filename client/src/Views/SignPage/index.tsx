import styles from "./style.module.less";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignPage = () => {
    const [viewSignUp, IsViewSignUp] = useState<null | boolean>(null);

    return (
        <div className={styles.SignPage}>
            <div className={styles.Wrapper}>
                <SignIn viewSignUp={viewSignUp} IsViewSignUp={IsViewSignUp} />
                <SignUp viewSignUp={viewSignUp} IsViewSignUp={IsViewSignUp} />
            </div>
        </div>
    );
};

export default SignPage;