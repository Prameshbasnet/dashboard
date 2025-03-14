import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const GenerateQrCode = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [error, setError] = useState('');
  const qrCodeRef = useRef(null);

  const handleGenerate = () => {
    if (!tableNumber) {
      setError('Please enter a table number');
      return;
    }

    if (!Number.isInteger(Number(tableNumber)) || Number(tableNumber) <= 0) {
      setError('Please enter a valid positive integer for table number');
      return;
    }

    const qrData = {
      tableNumber: tableNumber.trim()
    };

    const qrCodeUrl = `${window.location.origin}/table?data=${encodeURIComponent(JSON.stringify(qrData))}`;

    setQrCodeValue(qrCodeUrl);
    setError('');
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.download = `table-${tableNumber}-qrcode.png`;
        link.href = url;
        link.click();
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        QR Code Generator
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Table Number"
            variant="outlined"
            fullWidth
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            error={!!error}
            helperText={error}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth size="large" disabled={!tableNumber}>
            Generate QR Code
          </Button>
        </Grid>

        {qrCodeValue && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div ref={qrCodeRef}>
                <QRCodeCanvas value={qrCodeValue} size={256} level="H" includeMargin={true} />
              </div>

              <Button variant="outlined" color="secondary" startIcon={<DownloadIcon />} onClick={downloadQRCode} sx={{ mt: 2 }}>
                Download QR Code
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default GenerateQrCode;
