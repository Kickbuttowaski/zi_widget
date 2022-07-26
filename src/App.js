import "./App.css";

import { Provider } from "react-redux";
import { store } from "./store";
import WidgetWrapper from "./components/WidgetWrapper/WidgetWrapper";
function App() {
  return (
    <Provider store={store}>
      <div className="zi__wrapper">
        <WidgetWrapper />
      </div>
    </Provider>
  );
}

export default App;
