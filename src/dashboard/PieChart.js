import MainCard from "components/MainCard";
import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {
  const { Personal, Business, Auto, Quick } = data;
  const series = [Personal, Business, Auto, Quick];
  const labels = ["Personal", "Business", "Auto", "Quick"];
  const options = {
    chart: {
      width: "100%",
      type: "pie"
    },
    labels: labels,
    colors: ["#05a6f0", "#f35325", "#81bc06", "#ffba08"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%"
          },
          legend: {
            position: "left"
          }
        }
      }
    ]
  };

  return <ReactApexChart options={options} series={series} type="pie" width={400} />;
};

// Generating dummy data
const dummyData = {
  Personal: Math.floor(Math.random() * 100),
  Business: Math.floor(Math.random() * 100),
  Auto: Math.floor(Math.random() * 100),
  Quick: Math.floor(Math.random() * 100)
};

const App = () => (
  <div>
    <h1>Loan Application</h1>
    <MainCard style={{ padding: "28px 8px 38px 90px", height: "350px", width: "600px", marginTop: "10px" }}>
      <PieChart data={dummyData} />
    </MainCard>
  </div>
);

export default App;
