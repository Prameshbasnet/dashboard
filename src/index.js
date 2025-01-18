import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App';
import store from './store'; // Import store and persistor
import 'assets/third-party/apex-chart.css';
import 'assets/themes/css/style.css';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
