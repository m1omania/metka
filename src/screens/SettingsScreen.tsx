import React, { useState, useEffect } from 'react';
import { UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { WalletService } from '../services/walletService';
import './SettingsScreen.css';

export const SettingsScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await WalletService.getUser();
    setUser(userData);
    setBiometricEnabled(userData.biometricEnabled);
  };

  const handleBiometricToggle = async (value: boolean) => {
    setBiometricEnabled(value);
    await WalletService.updateUser({ biometricEnabled: value });
    alert(value ? 'FaceID/TouchID включен' : 'FaceID/TouchID выключен');
  };

  const handleEmailChange = () => {
    alert('Функция смены email будет доступна в полной версии приложения');
  };

  const handleSupport = () => {
    window.open('https://t.me/metka_support', '_blank');
  };

  const handleRecoveryInfo = () => {
    alert(
      'Ваш закрытый ключ хранится только на этом устройстве. Для восстановления используйте:\n\n• Email\n• iCloud\n• Google Drive\n\nУбедитесь, что вы сохранили резервную копию.'
    );
  };

  if (!user) {
    return (
      <div className="settings-screen loading">
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="settings-screen">
      <div className="settings-content">
        <div className="section">
          <div className="section-title">Личный кабинет</div>
          <div className="profile-card">
            <div className="profile-icon">
              <UserIcon className="profile-icon-svg" />
            </div>
            <div className="profile-info">
              <div className="profile-email">{user.email}</div>
              <div className="profile-label">Email</div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Информация</div>
          <div className="info-card">
            <div className="info-label">Доступные валюты</div>
            <div className="info-value">USDT, POL</div>
          </div>
          <div className="info-card clickable" onClick={handleEmailChange}>
            <div className="info-label">Email</div>
            <div className="info-row">
              <div className="info-value">{user.email}</div>
              <div className="info-arrow">→</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-label">Статус бэкапа</div>
            <div className="info-row">
              <div
                className="info-value"
                style={{ color: user.hasBackup ? '#34C759' : '#FF3B30' }}
              >
                {user.hasBackup ? (
                  <>
                    <CheckCircleIcon className="status-icon" /> Сохранен
                  </>
                ) : (
                  <>
                    <XCircleIcon className="status-icon" /> Не сохранен
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Безопасность</div>
          <div className="security-card">
            <div className="security-row">
              <div className="security-info">
                <div className="security-label">FaceID / TouchID</div>
                <div className="security-description">Использовать биометрию для входа</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={biometricEnabled}
                  onChange={(e) => handleBiometricToggle(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="security-card">
            <div className="security-row">
              <div className="security-info">
                <div className="security-label">Восстановление ключа</div>
                <div className="security-description">
                  {user.hasBackup ? 'Настроено' : 'Не настроено'}
                </div>
              </div>
              <div
                className="security-status"
                style={{ color: user.hasBackup ? '#34C759' : '#FF3B30' }}
              >
                {user.hasBackup ? (
                  <CheckCircleIcon className="security-status-icon" />
                ) : (
                  <XCircleIcon className="security-status-icon" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Безопасность кошелька</div>
          <div className="security-info-card">
            <div className="security-info-title">
              Ваш закрытый ключ хранится только на устройстве
            </div>
            <div className="security-info-text">
              Мы не видим и не получаем доступ к вашему закрытому ключу. Это non-custodial
              кошелек, что означает полный контроль над вашими средствами.
            </div>
            <div className="security-info-subtitle">Восстановление:</div>
            <div className="security-info-text">• Email<br />• iCloud<br />• Google Drive</div>
          </div>
          <button className="recovery-button" onClick={handleRecoveryInfo}>
            Инструкция по восстановлению
          </button>
        </div>

        <div className="section">
          <button className="support-button" onClick={handleSupport}>
            <div className="support-button-text">Поддержка</div>
            <div className="support-button-subtext">Telegram: @metka_support</div>
          </button>
        </div>
      </div>
    </div>
  );
};
