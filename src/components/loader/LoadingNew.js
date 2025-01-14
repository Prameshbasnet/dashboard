import React from 'react';
import { Spin, Alert } from 'antd';

const LoadingSpinnerNew = ({ tip, title, description }) => {
  return (
    <Spin tip={tip}>
      <Alert message={title} description={description} type="info" size="large"/>
    </Spin>
  );
};

export default LoadingSpinnerNew;
