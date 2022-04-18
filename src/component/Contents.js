import styles from "./Contents.module.css";
import { useRef, useEffect, useState } from "react";
import InfoTab from "./InfoTab";

function Content(props) {
  const title = props.info.title;
  const idxTeam = props.info.teamIndex;
  const ssum = props.info.ssum;
  const category = props.category;
  const num = props.num;
  const setShowInfo = props.setShowInfo;
  const contentIndex = props.contentIndex;

  const moveContent = (event) => {
    if (window.innerWidth <= 767) return;
    event.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const onClickContent = () => {
    const sltContent = document.getElementById(`${props.index}`);
    if (sltContent.classList.contains(`${styles.content}`)) {
      props.setSltInfo(contentIndex);
      const box = document.getElementById(`${styles.contentBox}`);
      const y = box.scrollTop + sltContent.getBoundingClientRect().top;
      const x = sltContent.getBoundingClientRect().left;
      const info = document.getElementById(`${styles.info}`);
      info.style.left = `${x}px`;
      // info.style.top = `${y}px`;
      info.style.top = `calc(${y}px - 60px)`;
      setShowInfo(true);
      if (!info.classList.contains(styles.show)) {
        info.classList.add(styles.show);
      }
      box.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      box.style.overflowY = "hidden";
    }
  };

  return (
    <div
      onMouseOver={moveContent}
      onClick={onClickContent}
      className={
        num === 0 ? `${styles.content} ${styles.selected}` : `${styles.content}`
      }
      id={`${props.index}`}
    >
      <p className={styles.cntTeam}>{category.team[idxTeam].name}</p>
      <img className={styles.ssum} src={ssum} onClick={onClickContent} />
      <h2 className={styles.cntTitle} onClick={onClickContent}>
        {title}
      </h2>
    </div>
  );
}

function Platform(props) {
  const srch = props.srch;
  const contents = props.contents;
  const idx = Number(props.idxCtg);
  const rendered = props.rendered;
  const setRendered = props.setRendered;
  const setShowInfo = props.setShowInfo;

  let sltIndex = 0;
  let length = -1;

  const refBox = useRef();
  const refPlat = useRef();

  const moveLeft = () => {
    if (length <= 0) {
      return;
    }
    const lstSltIdx = `${props.idx}${sltIndex.toString()}`;
    const lastSelected = document.getElementById(lstSltIdx);
    if (sltIndex === 0) {
      sltIndex = length;
    } else {
      sltIndex -= 1;
    }
    const sltIdx = `${props.idx}${sltIndex.toString()}`;
    const select = document.getElementById(sltIdx);
    select.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    lastSelected.classList.remove(styles.selected);
    select.classList.add(styles.selected);
  };

  const moveRight = () => {
    if (length <= 0) {
      return;
    }
    const lstSltIdx = `${props.idx}${sltIndex.toString()}`;
    const lastSelected = document.getElementById(lstSltIdx);
    if (sltIndex === length) {
      sltIndex = 0;
    } else {
      sltIndex += 1;
    }
    const sltIdx = `${props.idx}${sltIndex.toString()}`;
    const select = document.getElementById(sltIdx);
    select.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    lastSelected.classList.remove(styles.selected);
    select.classList.add(styles.selected);
  };

  const setZero = () => {
    length = -1;
    setRendered(true);
  };

  useEffect(() => {
    setZero();
  }, []);

  return (
    <div className={styles.outBox} ref={refPlat}>
      <div className={styles.platform}>
        <span className={styles.platTitle}>- {props.title} -</span>
        {rendered === true ? (
          <div className={`${styles.contentBox}`} ref={refBox}>
            {contents.map((content, index) => {
              if (
                content.platformIndex === props.idx &&
                (content.teamIndex === idx || idx === -1)
              ) {
                if (srch === "" || srch === undefined) {
                  length += 1;
                  return (
                    <Content
                      index={`${props.idx}${length}`}
                      contentIndex={index}
                      num={length}
                      key={content.idx}
                      info={content}
                      category={props.category}
                      setShowInfo={setShowInfo}
                      setSltInfo={props.setSltInfo}
                    />
                  );
                } else {
                  if (content.title.includes(srch)) {
                    length += 1;
                    return (
                      <Content
                        index={`${props.idx}${length}`}
                        contentIndex={index}
                        num={length}
                        key={content.idx}
                        info={content}
                        category={props.category}
                        setShowInfo={setShowInfo}
                        setSltInfo={props.setSltInfo}
                      />
                    );
                  } else {
                    if (index === contents.length - 1 && length < 0) {
                      return (
                        <span key={content.idx} className={styles.noResult}>
                          검색 결과가 없습니다...
                        </span>
                      );
                    } else return null;
                  }
                }
              } else {
                if (index === contents.length - 1 && length < 0) {
                  return (
                    <span key={content.idx} className={styles.noResult}>
                      검색 결과가 없습니다...
                    </span>
                  );
                } else return null;
              }
            })}
          </div>
        ) : null}
      </div>
      {length > 0 ? (
        <>
          <button className={styles.left} onClick={moveLeft}>
            &lt;
          </button>
          <button className={styles.right} onClick={moveRight}>
            &gt;
          </button>
        </>
      ) : null}
    </div>
  );
}

function Contents(props) {
  const srch = props.srch;
  const category = props.category;
  const contents = props.contents;
  const idxCtg = props.indexOfCategory;
  const idxCnt = props.indexOfContents;
  const rendered = props.rendered;
  const setRendered = props.setRendered;
  const [showInfo, setShowInfo] = useState(false);
  const [sltInfo, setSltInfo] = useState(0);

  const closeTab = () => {
    const box = document.getElementById(`${styles.info}`);
    box.classList.toggle(styles.show);
    const contentBox = document.getElementById(`${styles.contentBox}`);
    contentBox.style.overflowY = "scroll";
    setShowInfo(false);
  };

  return (
    <div id={styles.contentBox} className={styles.box}>
      {category.platforms.map((platform, index) => (
        <Platform
          key={index}
          srch={srch}
          idx={index}
          title={platform}
          contents={contents}
          category={category}
          idxCtg={idxCtg}
          idxCnt={idxCnt}
          rendered={rendered}
          setRendered={setRendered}
          setShowInfo={setShowInfo}
          setSltInfo={setSltInfo}
        />
      ))}
      <div id={styles.info}>
        <InfoTab
          sltInfo={sltInfo}
          contents={contents}
          category={category}
          showInfo={showInfo}
        />
        <div className={styles.close} onClick={closeTab} />
      </div>
    </div>
  );
}

export default Contents;
