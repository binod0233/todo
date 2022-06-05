import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import MainContainer from "./component/MainContainer";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
