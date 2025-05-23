import styles from '../styles/App.module.css'
import { useDbState } from "../store/usedbStore";

export const Navbar = ()=>{
          const {db}= useDbState()
 
    return (
      <div className={styles.navbar}>
        <div className={styles.navLeft}>MedBlocks</div>
        <div className={styles.navRight}>
          <div
            className={`${styles.statusDot} ${
              db ? styles.connected : styles.disconnected
            }`}
          />
          <span>{db ? "Connected" : "Disconnected"}</span>
        </div>
      </div>
    );
}