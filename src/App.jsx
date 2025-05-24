import React, { useEffect } from "react";
import PatientRegistration from "./pages/patientRegistration";
import { useDbState } from "./store/usedbStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Query from "./pages/query";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { initDb } = useDbState();

  useEffect(() => {
    initDb();
    console.log('db init')
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Success toast style
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#10B981',
              color: '#fff',
            },
          },
          // Error toast style
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<PatientRegistration />} />
          <Route path="query" element={<Query />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
