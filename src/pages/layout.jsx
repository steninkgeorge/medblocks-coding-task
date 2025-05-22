import React from 'react'
import { Sidebar } from './sidebar';
import styles from '../styles/App.module.css'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
      const [dbStatus, setDbStatus] = useState(true);

  return (
    <div className={styles.appContainer}>
      {/* Sidebar */}
      
    <Sidebar/>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Navbar */}
        <div className={styles.navbar}>
          <div className={styles.navLeft}>MedBlocks</div>
          <div className={styles.navRight}>
            <div
              className={`${styles.statusDot} ${
                dbStatus ? styles.connected : styles.disconnected
              }`}
            />
            <span>{dbStatus ? "Connected" : "Disconnected"}</span>
          </div>
        </div>

        {/* Page Content */}
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout