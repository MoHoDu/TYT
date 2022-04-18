import { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styles from "./Search.module.css";
import image from "./images/face.png";

function Search(props) {
  let history = useHistory();
  let num = 0;
  let i = 0;
  const [search, setSearch] = useState("");
  const contents = props.contents;
  const onChange = (event) => {
    setSearch(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    props.setSrch(search);
    history.push({
      pathname: `/result/${search}`,
    });
  };
  const onClick = (event) => {
    event.preventDefault();
    props.setSrch("");
    history.push({
      pathname: "/",
    });
  };

  return (
    <div className={styles.box}>
      <form id="frm" onSubmit={onSubmit} method="post">
        <input
          className={styles.searchBar}
          onChange={onChange}
          name="searchValue"
          type="search"
          value={search}
          placeholder="영상을 검색해보세요"
        />
        <input className={styles.searchBtn} type="submit" value=" " />
        <ion-icon className={styles.search} name="search-outline"></ion-icon>
      </form>
      <div className={styles.resultBox}>
        <div className={styles.innerBox}>
          {contents.map((content, index) => {
            if (i > 5 || search === "") {
              num += 1;
              if (search !== "" && index === contents.length - 1) {
                return <p key={index}>외 {num}개</p>;
              }
              return null;
            } else if (content.title.includes(search)) {
              i += 1;
              return (
                <p className={styles.result} key={index}>
                  {content.title}
                </p>
              );
            }
          })}
        </div>
      </div>
      <button className={styles.xBtn} onClick={onClick}></button>
      <img className={styles.face} src={image} />
    </div>
  );
}

export default withRouter(Search);
