import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import { fetchDashboard, selectDashboardData } from "store/slice/dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DiamondIcon from "@mui/icons-material/Diamond";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person"; // For Own Cheque
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Link } from "react-router-dom"; // Import Link

const ChequeCount = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const data = [
    { title: "New Cheque", value: dashboardData[0]?.newCheques, color: "#16a34a", icon: <CreditCardIcon fontSize="large" /> },
    { title: "High Value Cheque", value: dashboardData[0]?.highValueCheque, color: "#f97316", icon: <DiamondIcon fontSize="large" /> },
    {
      title: "Express Cheque",
      value: dashboardData[0]?.expressCheque,
      color: "#3b82f6 ",
      icon: <BoltIcon fontSize="large" />,
      link: "/bulk-importer/express-cheque"
    },
    {
      title: "Normal Cheque",
      value: dashboardData[0]?.normalCheque,
      color: "#64748b ",
      icon: <LocalAtmIcon fontSize="large" />,
      link: "/bulk-importer/normal-cheque"
    },
    {
      title: "Own Cheque",
      value: dashboardData[0]?.ownCheque,
      color: "#14b8a6",
      icon: <PersonIcon fontSize="large" />,
      link: "/bulk-importer/banks-own-cheque"
    },
    { title: "Total Statement", value: dashboardData[0]?.totalStatement, color: "#d97706", icon: <SummarizeIcon fontSize="large" /> }
  ];

  return (
    <Row gutter={[24, 24]} className="cheque-count-row">
      {data.map((item, index) => (
        <Col xs={24} sm={12} md={6} lg={6} xl={6} key={index} className="cheque-count-col">
          {item.link ? (
            <Link to={item.link}>
              <Card
                bodyStyle={{ padding: "0px 8px", width: "160px" }}
                style={{ backgroundColor: item.color }}
                className="cheque-count-card"
              >
                <div className="cheque-card-body">
                  <span className="cheque-count-icon" style={{ marginTop: "13px", color: "white" }}>
                    {item.icon}
                  </span>
                  <div className="cheque-desc">
                    <span className="cheque-count-value">{item?.value}</span>
                    <p className="cheque-count-title">{item?.title}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <Card bodyStyle={{ padding: "0px 8px", width: "150px" }} style={{ backgroundColor: item.color }} className="cheque-count-card">
              <div className="cheque-card-body">
                <span className="cheque-count-icon" style={{ marginTop: "13px", color: "white" }}>
                  {item.icon}
                </span>
                <div className="cheque-desc">
                  <span className="cheque-count-value">{item.value}</span>
                  <p className="cheque-count-title">{item.title}</p>
                </div>
              </div>
            </Card>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default ChequeCount;
