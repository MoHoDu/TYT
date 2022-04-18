import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <div className={styles.box}>
        <ion-icon className={styles.sideMenu} name="menu-outline"></ion-icon>
        <Link className={styles.menu} to="/menu"></Link>
        <Link className={styles.logo} to="/who">
          tyt
        </Link>
        <Link className={styles.search} to="/search"></Link>
        <ion-icon name="search-outline"></ion-icon>
      </div>
    </>
  );
}

export default Header;
