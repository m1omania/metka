import React, { useState, useEffect } from 'react';
import { Wallet } from '../types';
import { BalanceDisplay } from '../components/BalanceDisplay';
import { DigitalKeyboard } from '../components/DigitalKeyboard';
import { LinkShareModal } from '../components/LinkShareModal';
import { WalletService } from '../services/walletService';
import { generateRequestLink } from '../utils/linkGenerator';
import './BalanceScreen.css';

export const BalanceScreen: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const walletData = await WalletService.getWallet();
    setWallet(walletData);
  };

  const handleKeyPress = (value: string) => {
    if (value === '.' && amount.includes('.')) {
      return;
    }
    setAmount((prev) => prev + value);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAmount('');
  };

  const handleRequest = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Введите сумму');
      return;
    }
    const link = generateRequestLink(parseFloat(amount));
    setLinkUrl(link.url);
    setShowLinkModal(true);
  };

  const handleQR = () => {
    if (!wallet) return;
    const link = generateRequestLink();
    setLinkUrl(link.url);
    setShowLinkModal(true);
  };

  const handleReceive = () => {
    if (!wallet) return;
    alert('Показ адреса кошелька для получения средств');
  };

  if (!wallet) {
    return (
      <div className="balance-screen loading">
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="balance-screen">
      <div className="balance-screen-content">
        <BalanceDisplay balance={wallet.balance} promoBalance={wallet.promoBalance} />

        <div className="input-container">
          <div className="input-label">Сумма</div>
          <div className="input-box">
            <div className="input-text">
              {amount || '0.00'} <span className="input-currency">USDT</span>
            </div>
          </div>
        </div>

        <DigitalKeyboard
          onPress={handleKeyPress}
          onDelete={handleDelete}
          onClear={handleClear}
        />

        <div className="action-buttons">
          <button className="action-button request-button" onClick={handleRequest}>
            Запросить
          </button>
          <button className="action-button qr-button" onClick={handleQR}>
            QR
          </button>
          <button className="action-button receive-button" onClick={handleReceive}>
            Получить
          </button>
        </div>

      </div>

      <LinkShareModal
        visible={showLinkModal}
        url={linkUrl}
        onClose={() => setShowLinkModal(false)}
      />
    </div>
  );
};
