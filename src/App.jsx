import React, { useEffect, useRef, useState } from "react";
import PatientRegistration from "./pages/patientRegistration";
import { useDbState } from "./store/usedbStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Query from "./pages/query";

const App = () => {
  const { db, initDb } = useDbState();

  useEffect(() => {
    initDb();
    console.log('db init')
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<PatientRegistration />} />
          <Route path='query' element={<Query/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
