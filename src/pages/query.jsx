import React, { useEffect, useState } from "react";
import styles from "../styles/Query.module.css";
import { executeQuery } from "../db/fetchPatientData";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { DownloadIcon, CopyIcon } from "lucide-react";
import toast from "react-hot-toast";
import { queryTemplates } from "../store/constants";
import { Row, Col, Tooltip, Card } from "antd";
const Query = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryMessage, setQueryMessage] = useState(null);
  const [status, setStatus] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
      setResults(location.state.result);
      setQueryMessage(location.state.message);
      setStatus(location.state.status);
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

      if (res.success && res.affectedRows > 0) {
        setQueryMessage(
          `query executed successfully , affected rows : ${res.affectedRows}`
        );
        setStatus("success");
      } else if (res.error) {
        setQueryMessage(res.error);
        setStatus("error");
      } else {
        setQueryMessage("No entries matched your query");
      }
      setResults(res.data);
    } catch (err) {
      setError(
        "Failed to execute query: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = Object.keys(results[0]);
    const csvContent = [
      headers.join(","),
      ...results.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma
            const stringValue = String(value || "");
            return stringValue.includes(",") || stringValue.includes('"')
              ? `"${stringValue.replace(/"/g, '""')}"`
              : stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query_results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("CSV exported successfully");
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(results, null, 2);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        toast.success("JSON copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy JSON");
      });
  };

  const handleTemplateClick = (query) => {
    setQuery(query);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Database Query</h2>
      <p className={styles.description}>
        Enter SQL queries to retrieve patient data. Use SELECT statements to
        query records.
      </p>

      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Quick Templates
        </h3>
        <Row gutter={[12, 12]}>
          {queryTemplates.map((template) => (
            <Col key={template.id} xs={12} sm={8} md={4} lg={4}>
              <Tooltip title={template.description}>
                <Card
                  hoverable
                  size="small"
                  onClick={() => handleTemplateClick(template.query)}
                  style={{
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    borderRadius: "16px",
                    padding: "1px",
                    textAlign: "center",
                    minHeight: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div style={{ color: "#1890ff", fontSize: "10px" }}>
                      {template.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {template.label}
                    </div>
                  </div>
                </Card>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.querySection}>
        <textarea
          className={styles.queryInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          rows={8}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <Button
            type="primary"
            disabled={isLoading}
            onClick={handleRunQuery}
            size="large"
          >
            {isLoading ? "Running..." : "Run Query"}
          </Button>

          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              icon={<DownloadIcon size={16} />}
              onClick={handleExportCSV}
              disabled={!results || results.length === 0}
            >
              Export CSV
            </Button>
            <Button
              icon={<CopyIcon size={16} />}
              onClick={handleCopyJSON}
              disabled={!results || results.length === 0}
            >
              Copy JSON
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <div className={styles.resultsSection}>
        {results && results.length > 0 ? (
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
            <p
              style={{
                color:
                  status === "error"
                    ? "#ff4d4f"
                    : status === "success"
                    ? "#52c41a"
                    : "#95a5a6",
              }}
            >
              {queryMessage ? queryMessage : "Query results will be shown here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Query;
