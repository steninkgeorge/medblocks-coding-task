
import styles from "../styles/App.module.css";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <Link
          to="/"
          className={`${styles.navItem} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/register"
          className={`${styles.navItem} ${
            location.pathname.includes("register") ? styles.active : ""
          }`}
        >
          Register
        </Link>
        <Link
          to="/query"
          className={`${styles.navItem} ${
            location.pathname.includes("query") ? styles.active : ""
          }`}
        >
          Query
        </Link>
        
      </nav>
    </div>
  );
};
