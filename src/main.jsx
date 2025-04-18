import { createRoot } from 'react-dom/client';
import 'Normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { store } from './features/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
