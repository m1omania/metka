import React from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { BalanceScreen } from '../screens/BalanceScreen';
import { SendReceiveScreen } from '../screens/SendReceiveScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import './AppNavigator.css';

export const AppNavigator: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app-navigator">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<BalanceScreen />} />
          <Route path="/send" element={<SendReceiveScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </div>
      <nav className="bottom-nav">
        <Link
          to="/"
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span className="nav-icon">💰</span>
          <span className="nav-label">Баланс</span>
        </Link>
        <Link
          to="/send"
          className={`nav-item ${location.pathname === '/send' ? 'active' : ''}`}
        >
          <span className="nav-icon">📤</span>
          <span className="nav-label">Отправить</span>
        </Link>
        <Link
          to="/settings"
          className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Настройки</span>
        </Link>
      </nav>
    </div>
  );
};
