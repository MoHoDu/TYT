import styles from "./Category.module.css";
import { useState } from "react";
import clsx from "clsx";
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
      {srch === "" ? null : (
        <button onClick={onClear} className={styles.clearBtn}>
          <span className={styles.xBtn}>x</span> {srch}
        </button>
      )}
      <select value={idxCtg} onChange={onSelect}>
        <option value={-1}>모두 보기</option>
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
