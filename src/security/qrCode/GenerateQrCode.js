import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const GenerateQrCode = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');

  const handleGenerate = () => {
    const qrData = {
      tableNumber
    };
    const qrCodeUrl = `https://prameshbasnet.com/table?data=${encodeURIComponent(JSON.stringify(qrData))}`;
    setQrCodeValue(qrCodeUrl);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Generate QR Code
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Table Number"
            variant="outlined"
            fullWidth
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
            Generate
          </Button>
        </Grid>
        <Grid item xs={12}>
          {qrCodeValue && <QRCodeCanvas value={qrCodeValue} size={256} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GenerateQrCode;
