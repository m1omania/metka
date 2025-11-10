import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Transaction } from '../types';
import { QrCodeIcon, PlusIcon, ArrowDownIcon, ArrowUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
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
  const [userInitial, setUserInitial] = useState<string>('А');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const walletData = await WalletService.getWallet();
    const transactionsData = await WalletService.getTransactions();
    const userData = await WalletService.getUser();
    setWallet(walletData);
    setTransactions(transactionsData);
    
    // Получаем первую букву из email или имени
    const initial = userData.email?.charAt(0).toUpperCase() || 'А';
    setUserInitial(initial);
  };

  const handleDeposit = () => {
    alert('Функция в разработке');
  };

  const handleWithdraw = () => {
    alert('Функция вывода в разработке');
  };

  const handleReceive = () => {
    navigate('/send?tab=receive');
  };

  const handleSend = () => {
    navigate('/send?tab=send');
  };

  const handleQR = () => {
    if (!wallet) return;
    const link = generateRequestLink();
    setLinkUrl(link.url);
    setShowLinkModal(true);
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
        <div className="balance-header">
          <button className="header-avatar-button" onClick={() => navigate('/settings')}>
            <div className="avatar-circle">{userInitial}</div>
          </button>
          <button className="header-icon-button" onClick={handleQR}>
            <QrCodeIcon className="header-icon" />
          </button>
        </div>
        <BalanceDisplay balance={wallet.balance} />

        <div className="balance-actions">
          <button className="balance-action-button deposit-button" onClick={handleDeposit}>
            <div className="balance-action-icon-circle">
              <PlusIcon className="balance-action-icon" />
            </div>
            <span className="balance-action-text">Пополнить</span>
          </button>
          <button className="balance-action-button withdraw-button" onClick={handleWithdraw}>
            <div className="balance-action-icon-circle">
              <ArrowDownIcon className="balance-action-icon" />
            </div>
            <span className="balance-action-text">Вывести</span>
          </button>
          <button className="balance-action-button receive-button" onClick={handleReceive}>
            <div className="balance-action-icon-circle">
              <ArrowUpIcon className="balance-action-icon" />
            </div>
            <span className="balance-action-text">Получить</span>
          </button>
          <button className="balance-action-button send-button" onClick={handleSend}>
            <div className="balance-action-icon-circle">
              <PaperAirplaneIcon className="balance-action-icon" />
            </div>
            <span className="balance-action-text">Отправить</span>
          </button>
        </div>
      </div>

      <div className="balance-screen-bottom">
        <WalletAddress address={wallet.address} />

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
