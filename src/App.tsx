import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavigator } from './navigation/AppNavigator';
import { initTelegram } from './utils/telegram';
import './App.css';

function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram?.WebApp) {
      initTelegram();
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <AppNavigator />
      </div>
    </Router>
  );
}

export default App;

