import React, { useEffect , useState} from "react";
import { Card, Row, Col, Statistic, Table, Tag, Space, Typography } from "antd";
import { UserPlus, Search, FileText, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { set } from "zod/v4";
import { getQueryLogs } from "../db/fetchPatientData";

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate()
  const [queryLogs, setQueryLogs]=useState([])
  const [error, setError]=useState('')

  const columns = [
    {
      title: "Query",
      dataIndex: "query",
      key: "query",
      ellipsis: true,
      width: "40%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "25%",
      render: (status) => (
        <Tag color={status === "success" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Result",
      dataIndex: "result_message",
      key: "result_message",
      width: "25%",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "25%",
    },
  ];

  const handleCardClick = (route) => {
    navigate(`${route}`)
  };

  useEffect(()=>{
    const getlogs =async()=>{
          try {
            const querylogs = await getQueryLogs()
            console.log(querylogs)
            setQueryLogs(querylogs)
          } catch (error) {
            setError(error);
          }
    }
    getlogs()
  },[])

  return (
    <div style={{ padding: "24px",  minHeight: "100vh" }}>
      <Card style={{ marginBottom: "24px" }}>
        <Row align="middle">
          <Col flex="none" style={{ marginRight: "16px" }}>
            <div
              style={{
                background: "#1890ff",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={32} color="white" />
            </div>
          </Col>
          <Col flex="auto">
            <Statistic
              title="Total Patients"
              value={1247}
              valueStyle={{
                color: "#1890ff",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => handleCardClick("/register")}
            style={{ height: "140px", cursor: "pointer",}}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <div
                style={{
                  background: "#52c41a",
                  borderRadius: "8px",
                  padding: "12px",
                  marginRight: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UserPlus size={24} color="white" />
              </div>
              <div>
                <Title level={4} style={{ margin: 0, marginBottom: "4px" }}>
                  Register
                </Title>
                <p style={{ margin: 0, color: "#666" }}>Add patient details</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => handleCardClick("/query")}
            style={{ height: "140px", cursor: "pointer" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <div
                style={{
                  background: "#1890ff",
                  borderRadius: "8px",
                  padding: "12px",
                  marginRight: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Search size={24} color="white" />
              </div>
              <div>
                <Title level={4} style={{ margin: 0, marginBottom: "4px" }}>
                  Query
                </Title>
                <p style={{ margin: 0, color: "#666" }}>
                  Search patient records
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => handleCardClick("/archive")}
            style={{ height: "140px", cursor: "pointer" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <div
                style={{
                  background: "#722ed1",
                  borderRadius: "8px",
                  padding: "12px",
                  marginRight: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FileText size={24} color="white" />
              </div>
              <div>
                <Title level={4} style={{ margin: 0, marginBottom: "4px" }}>
                  Records
                </Title>
                <p style={{ margin: 0, color: "#666" }}>
                  View all patient history
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              background: "#fa8c16",
              borderRadius: "8px",
              padding: "8px",
              marginRight: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Activity size={20} color="white" />
          </div>
          <Title level={3} style={{ margin: 0 }}>
            Recent Query Activity
          </Title>
        </div>

        <Table
          columns={columns}
          dataSource={queryLogs}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
          }}
          size="small"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
