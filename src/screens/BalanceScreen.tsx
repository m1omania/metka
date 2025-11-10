import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Transaction } from '../types';
import { BalanceDisplay } from '../components/BalanceDisplay';
import { WalletAddress } from '../components/WalletAddress';
import { TransactionHistory } from '../components/TransactionHistory';
import { LinkShareModal } from '../components/LinkShareModal';
import { WalletService } from '../services/walletService';
import { generateRequestLink } from '../utils/linkGenerator';
import './BalanceScreen.css';

export const BalanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const walletData = await WalletService.getWallet();
    const transactionsData = await WalletService.getTransactions();
    setWallet(walletData);
    setTransactions(transactionsData);
  };

  const handleSend = () => {
    navigate('/send');
  };

  const handleReceive = () => {
    if (!wallet) return;
    alert('Показ адреса кошелька для получения средств');
  };

  const handleQR = () => {
    if (!wallet) return;
    const link = generateRequestLink();
    setLinkUrl(link.url);
    setShowLinkModal(true);
  };

  const handleDeposit = () => {
    alert('Функция пополнения в разработке');
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

        <div className="balance-actions">
          <button className="balance-action-button send-button" onClick={handleSend}>
            Отправить
          </button>
          <button className="balance-action-button receive-button" onClick={handleReceive}>
            Получить
          </button>
          <button className="balance-action-button qr-button" onClick={handleQR}>
            QR
          </button>
          <button className="balance-action-button deposit-button" onClick={handleDeposit}>
            Пополнить
          </button>
        </div>
      </div>

      <div className="balance-screen-bottom">
        <WalletAddress address={wallet.address} />

        <div className="deposit-section">
          <div className="section-title">Пополнение</div>
          <div className="deposit-buttons-row">
            <button className="deposit-button disabled" disabled>
              Банковская карта
            </button>
            <button className="deposit-button disabled" disabled>
              CoinbasePay
            </button>
            <button className="deposit-button disabled" disabled>
              CryptoWallet
            </button>
          </div>
        </div>

        <div className="withdraw-section">
          <div className="section-title">Вывод</div>
          <div className="deposit-buttons-row">
            <button className="deposit-button disabled" disabled>
              Банковская карта
            </button>
            <button className="deposit-button disabled" disabled>
              Подарочная карта
            </button>
            <button className="deposit-button disabled" disabled>
              Криптокошелек
            </button>
          </div>
        </div>

        <TransactionHistory transactions={transactions} />
      </div>

      <LinkShareModal
        visible={showLinkModal}
        url={linkUrl}
        onClose={() => setShowLinkModal(false)}
      />
    </div>
  );
};
