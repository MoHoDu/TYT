import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Transition from "./component/Transition";

function App() {
  return (
    <Router>
      <Transition />
    </Router>
  );
}

export default App;
