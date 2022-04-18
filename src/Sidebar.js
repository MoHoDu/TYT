import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

function Sidebar(props) {
  const history = useHistory();
  const [id, setId] = useState("");
  const [ps, setPs] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/",
      state: { id: { id }, ps: { ps } },
    });
    props.setIsLogin(true);
  };

  const logOut = () => {
    props.setIsLogin(false);
    props.setName("");
    history.push({
      pathname: "/",
    });
  };

  const inputId = (event) => {
    setId(event.target.value);
  };

  const inputPs = (event) => {
    setPs(event.target.value);
  };

  return (
    <div className={styles.box}>
      <Link className={styles.xBtn} to="/"></Link>
      {props.name !== "" ? (
        <div className={styles.loginForm}>
          <p>Welcome back!</p>
          <p>{props.name}</p>
          <button className={styles.logOutBtn} onClick={logOut}>
            log out
          </button>
        </div>
      ) : (
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <p className={styles.id}>
            <span>id : </span>
            <input onChange={inputId}></input>
          </p>
          <p className={styles.ps}>
            <span>ps : </span>
            <input type="password" onChange={inputPs}></input>
          </p>
          <button className={styles.sbmitBtn} type="submit">
            Login
          </button>
        </form>
      )}

      <div>
        <ul>
          장르별 색인
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
