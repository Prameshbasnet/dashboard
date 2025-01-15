import MainCard from 'components/MainCard';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChartApplication = ({ data }) => {
  const { Bijay } = data;
  const series = [Bijay];
  const labels = ['Bijay'];
  const options = {
    chart: {
      width: '100%',
      type: 'pie'
    },
    labels: labels,
    colors: ['#05a6f0', '#f35325'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'left'
          }
        }
      }
    ]
  };

  return <ReactApexChart options={options} series={series} type="pie" width={400} />;
};

// Generating dummy data
const dummyData = {
  Bijay: Math.floor(Math.random() * 100)
};

const App = () => (
  <div>
    <h1> Dummy</h1>
    <MainCard style={{ padding: '28px 8px 38px 90px', height: '350px', width: '600px', marginTop: '10px' }}>
      <PieChartApplication data={dummyData} />
    </MainCard>
  </div>
);

export default App;
