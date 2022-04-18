import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Category from "./component/Category";
import Contents from "./component/Contents";
import Header from "./component/Header";
import styles from "./Main.module.css";

function Main(props) {
  // const { result } = useParams();
  const srch = props.srch;
  const category = props.category;
  const setCtg = props.setCategory;
  const contents = props.contents;
  const setCnt = props.setContents;
  const [idxCtg, setIdxCtg] = useState(-1);
  const [idxCnt, setIdxCnt] = useState(-1);

  const rendered = props.rendered;
  const setRendered = props.setRendered;

  const location = useLocation();

  // if (result !== srch) {
  //   props.setSrch(result);
  // }

  const funLogin = async (id, ps) => {
    let i = false;
    await category.login.map((value, index) => {
      console.log(index, value.id, value.ps);
      if (value.id === id && value.ps === ps) {
        props.setName(value.name);
        props.setAdmin(true);
        i = true;
      }
    });
    if (i === false) {
      alert("로그인 정보를 확인하세요!");
      props.setIsLogin(false);
    } else {
      alert("로그인 성공!");
    }
  };

  useEffect(() => {
    if (props.isLogin === false) return;
    if (location.state.id !== undefined || location.state.id !== "") {
      const id = location.state.id.id;
      const ps = location.state.ps.ps;
      funLogin(id, ps);
    }
  }, [props.isLogin]);

  return (
    <div className={styles.box}>
      {props.loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <Header />
          <Category
            srch={srch}
            setSrch={props.setSrch}
            category={category}
            idxCtg={idxCtg}
            setIdxCtg={setIdxCtg}
            rendered={rendered}
            setRendered={setRendered}
          />
          <Contents
            srch={srch}
            category={category}
            contents={contents}
            indexOfCategory={idxCtg}
            indexOfContents={idxCnt}
            setIdxCtg={setIdxCtg}
            rendered={rendered}
            setRendered={setRendered}
          />
        </>
      )}
    </div>
  );
}

export default Main;
