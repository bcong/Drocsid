import { useMainStore } from './Stores/index';
import SignPage from "@Views/SignPage";

const App = () => {
    const mainStore = useMainStore();

    let viewPageElem;
    switch (mainStore.view) {
        case "":
            viewPageElem = <SignPage />;
            break;
    }

    return viewPageElem;
};

export default App;