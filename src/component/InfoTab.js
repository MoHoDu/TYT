import styles from "./InfoTab.module.css";
import { useEffect } from "react";

function InfoTab(props) {
  const contents = props.contents;
  const sltInfo = props.sltInfo;

  const title = `${contents[sltInfo].title}`;
  const movie = `⌜${contents[sltInfo].movieTitle}⌟`;
  console.log(contents);

  useEffect(() => {
    const infoBox = document.getElementById(`${styles.box}`);
    infoBox.classList.toggle(styles.show);
  }, [props.showInfo]);
  return (
    <div id={styles.box} className={styles.show}>
      <div className={styles.innerBox}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.movieTitle}>{movie}</span>
        <div className={styles.ssum}></div>
        <div className={styles.info}>
          <p>설명</p>
          <p>설명</p>
          <p>설명</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTab;
