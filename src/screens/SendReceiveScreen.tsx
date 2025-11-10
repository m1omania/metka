import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import { Transaction } from '../types';
import { DigitalKeyboard } from '../components/DigitalKeyboard';
import { TransactionHistory } from '../components/TransactionHistory';
import { LinkShareModal } from '../components/LinkShareModal';
import { WalletService } from '../services/walletService';
import { generateRequestLink, generateSendLink } from '../utils/linkGenerator';
import './SendReceiveScreen.css';

type TabType = 'send' | 'receive';

export const SendReceiveScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'receive' ? 'receive' : 'send');
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [userInitial, setUserInitial] = useState<string>('А');

  useEffect(() => {
    loadTransactions();
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await WalletService.getUser();
    const initial = userData.email?.charAt(0).toUpperCase() || 'А';
    setUserInitial(initial);
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType | null;
    if (tabParam === 'receive' || tabParam === 'send') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const loadTransactions = async () => {
    const data = await WalletService.getTransactions();
    setTransactions(data);
  };

  const formatAmount = (value: string): string => {
    if (!value || value === '0') return '0,00';
    // Заменяем точку на запятую для отображения
    return value.replace('.', ',');
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


  const handleGenerateLink = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Введите сумму');
      return;
    }

    const link =
      activeTab === 'send'
        ? generateSendLink(parseFloat(amount))
        : generateRequestLink(parseFloat(amount));
    setLinkUrl(link.url);
    setShowLinkModal(true);
    setAmount('');
  };

  const handleQR = () => {
    const link = generateRequestLink();
    setLinkUrl(link.url);
    setShowLinkModal(true);
  };

  const filteredTransactions = transactions.filter((t) =>
    activeTab === 'send' ? t.type === 'outgoing' : t.type === 'incoming'
  );

  return (
    <div className="send-receive-screen">
      <div className="send-receive-header">
        <button className="header-avatar-button" onClick={() => navigate('/settings')}>
          <div className="avatar-circle">{userInitial}</div>
        </button>
        <div className="tab-container">
          <button
            className={`tab ${activeTab === 'send' ? 'active' : ''}`}
            onClick={() => setActiveTab('send')}
          >
            Отправить
          </button>
          <button
            className={`tab ${activeTab === 'receive' ? 'active' : ''}`}
            onClick={() => setActiveTab('receive')}
          >
            Получить
          </button>
        </div>
        <button className="header-icon-button" onClick={handleQR}>
          <QrCodeIcon className="header-icon" />
        </button>
      </div>

      <div className="send-receive-content">
        <div className="input-section">
          <div className="input-label">
            {activeTab === 'send' ? 'Сумма для отправки' : 'Сумма для получения'}
          </div>
          <div className="amount-display">
            <div className="amount-text">{formatAmount(amount)}</div>
            <div className="amount-currency">USDT</div>
          </div>
        </div>

        <DigitalKeyboard
          onPress={handleKeyPress}
          onDelete={handleDelete}
        />

        <button className="generate-button" onClick={handleGenerateLink}>
          {activeTab === 'send' ? 'Отправить' : 'Получить'}
        </button>

        <div className="history-section">
          <TransactionHistory 
            transactions={filteredTransactions} 
            title={activeTab === 'send' ? 'История отправки' : 'История получения'}
          />
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
