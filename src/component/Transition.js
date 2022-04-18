import styles from "./Transition.module.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Main from "../Main";
import History from "../History";
import categoryJson from "../category.json";
import contentsJson from "../contents.json";
import Search from "../Search";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import Header from "./Header";
import Sidebar from "../Sidebar";

function Transition(props) {
  const [category, setCategory] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [srch, setSrch] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  const [rendered, setRendered] = useState(false);

  const getDatas = async () => {
    setCategory(categoryJson);
    setContents(contentsJson);
    setLoading(false);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const pageHistory = () => (
    <div className={styles.page}>
      <History />
    </div>
  );
  const pageSidebar = () => (
    <div className={styles.menu}>
      <Sidebar
        name={name}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setName={setName}
      />
    </div>
  );
  const pageSearch = () => (
    <div className={styles.page}>
      <Search
        contents={contents}
        srch={srch}
        setSrch={setSrch}
        setRendered={setRendered}
      />
    </div>
  );

  return (
    <>
      <Route path={["/", "/result/:result"]}>
        <Main
          srch={srch}
          setSrch={setSrch}
          category={category}
          contents={contents}
          setCategory={setCategory}
          setContents={setContents}
          loading={loading}
          setLoading={setLoading}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          name={name}
          setName={setName}
          setAdmin={setAdmin}
          rendered={rendered}
          setRendered={setRendered}
        />
      </Route>
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup className="transitionGroup">
              <CSSTransition
                key={location.key}
                classNames={{
                  enterActive: styles.enterActive,
                  enterDone: styles.enterDone,
                  exitActive: styles.exitActive,
                  exitDone: styles.exitDone,
                  leaveActive: styles.leaveActive,
                  leaveDone: styles.leaveDone,
                  exit: styles.exit,
                }}
                timeout={500}
              >
                <Switch location={location}>
                  <Route exact path="/who" component={pageHistory} />
                  <Route exact path="/menu" component={pageSidebar} />
                  <Route exact path="/search" component={pageSearch} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </>
  );
}

export default Transition;
