import React, { useEffect, useState } from "react";
import styles from "../styles/Query.module.css";
import { executeQuery } from "../db/fetchPatientData";
import { Button } from "antd";
import toast from "react-hot-toast";
const Query = () => {
  const [query, setQuery] = useState("SELECT * FROM patients ");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryMessage, setQueryMessage] = useState(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("lastQueryResult");
    if (storedResult) {
      const res = JSON.parse(storedResult);
      setResults(res);
    }
  }, []);


  const handleRunQuery = async () => {
    if (!query.trim()) {
      setError("Please enter a query");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await executeQuery(query);

      if (res.success) {
        setQueryMessage(
          `updated rows: ${res.data.length},  affected rows : ${res.affectedRows}`
        );
      } else {
        setQueryMessage(null);
      }
      setResults(res.data);
      sessionStorage.setItem("lastQueryResult", JSON.stringify(res.data));

      if (!res.success) {
        toast.error(res.error, { position: "top-right" });
        setQueryMessage(res.error);
      }
    } catch (err) {
      setError(
        "Failed to execute query: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Database Query</h2>
      <p className={styles.description}>
        Enter SQL queries to retrieve patient data. Use SELECT statements to
        query records.
      </p>

      <div className={styles.querySection}>
        <textarea
          className={styles.queryInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          rows={8}
        />

        <Button type="primary" disabled={isLoading} onClick={handleRunQuery}>
          Run Query
        </Button>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <div className={styles.resultsSection}>
        {results ? (
          results.length > 0 ? (
            <div className={styles.resultsTableContainer}>
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyResults}>
              <p>
                {queryMessage
                  ? queryMessage
                  : "No records found matching your query"}
              </p>
            </div>
          )
        ) : (
          <div className={styles.initialState}>
            <p>Query results will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Query;
