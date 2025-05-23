import React, { useEffect } from "react";
import PatientRegistration from "./pages/patientRegistration";
import { useDbState } from "./store/usedbStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Query from "./pages/query";
import PatientRecords  from "./pages/patient-records";

const App = () => {
  const { initDb } = useDbState();

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
          <Route path="query" element={<Query />} />
          <Route path="archive" element={<PatientRecords />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
