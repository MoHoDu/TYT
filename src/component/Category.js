import styles from "./Category.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Category({ srch, setSrch, idxCtg, setIdxCtg, category }) {
  let history = useHistory();
  const onSelect = (event) => {
    setIdxCtg(event.target.value);
  };

  const onClear = () => {
    setSrch("");
    history.push({
      pathname: "/",
    });
  };

  return (
    <div className={styles.box}>
      <div className={styles.members}>
        <span className={styles.member}>한</span>
        <span className={styles.member}>동</span>
        <span className={styles.member}>M</span>
        <span className={styles.member}>J</span>
        <span className={styles.member}>규</span>
        <span className={styles.member}>안</span>
        <span className={styles.member}>가</span>
        <span className={styles.memText}>멤버별 색인 ↘︎</span>
      </div>
      {srch === "" ? null : (
        <div className={styles.btnBox}>
          <button onClick={onClear} className={styles.clearBtn}>
            <span className={styles.xBtn}>x</span> {srch}
          </button>
        </div>
      )}
      <select value={idxCtg} onChange={onSelect}>
        <option value={-1}>팀별 보기</option>
        {category.team.map((x, index) => {
          return (
            <option key={index} value={index}>
              {x.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Category;
