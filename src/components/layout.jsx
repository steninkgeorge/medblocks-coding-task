import React from 'react'
import { Sidebar } from './sidebar';
import styles from '../styles/App.module.css'
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
const Layout = () => {

  return (
    <div className={styles.appContainer}>
      <Navbar />

      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout