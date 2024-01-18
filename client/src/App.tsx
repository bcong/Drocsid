import { observer } from "mobx-react-lite";
import React, { } from "react";

const App = observer(() => {
    const handleSignup = () => {

    };

    return (
        <div onClick={handleSignup}>
            <p>React 테스트</p>
        </div>
    );
});

export default App;