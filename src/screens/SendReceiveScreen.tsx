import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { DigitalKeyboard } from '../components/DigitalKeyboard';
import { TransactionHistory } from '../components/TransactionHistory';
import { LinkShareModal } from '../components/LinkShareModal';
import { WalletService } from '../services/walletService';
import { generateRequestLink, generateSendLink } from '../utils/linkGenerator';
import './SendReceiveScreen.css';

type TabType = 'send' | 'receive';

export const SendReceiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('send');
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await WalletService.getTransactions();
    setTransactions(data);
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

  const filteredTransactions = transactions.filter((t) =>
    activeTab === 'send' ? t.type === 'outgoing' : t.type === 'incoming'
  );

  return (
    <div className="send-receive-screen">
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

      <div className="send-receive-content">
        <div className="input-section">
          <div className="input-label">
            {activeTab === 'send' ? 'Сумма для отправки' : 'Сумма для получения'}
          </div>
          <div className="input-container">
            <div className="input-wrapper">
              <input
                className="input-field"
                type="text"
                value={amount || '0.00'}
                placeholder="0.00"
                readOnly
              />
              <span className="input-currency">USDT</span>
            </div>
          </div>
        </div>

        <DigitalKeyboard
          onPress={handleKeyPress}
          onDelete={handleDelete}
          onClear={handleClear}
        />

        <button className="generate-button" onClick={handleGenerateLink}>
          {activeTab === 'send' ? 'Создать ссылку отправки' : 'Создать ссылку получения'}
        </button>

        <div className="history-section">
          <div className="section-title">
            {activeTab === 'send' ? 'Исходящие транзакции' : 'Входящие транзакции'}
          </div>
          <TransactionHistory transactions={filteredTransactions} />
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
