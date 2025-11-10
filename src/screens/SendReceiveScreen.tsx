import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { DigitalKeyboard } from '../components/DigitalKeyboard';
import { TransactionHistory } from '../components/TransactionHistory';
import { LinkShareModal } from '../components/LinkShareModal';
import { WalletService } from '../services/walletService';
import { generateRequestLink, generateSendLink } from '../utils/linkGenerator';
import './SendReceiveScreen.css';

type TabType = 'request' | 'send';

export const SendReceiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('request');
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
      activeTab === 'request'
        ? generateRequestLink(parseFloat(amount))
        : generateSendLink(parseFloat(amount));
    setLinkUrl(link.url);
    setShowLinkModal(true);
    setAmount('');
  };

  const filteredTransactions = transactions.filter((t) =>
    activeTab === 'request' ? t.type === 'incoming' : t.type === 'outgoing'
  );

  return (
    <div className="send-receive-screen">
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Запросить
        </button>
        <button
          className={`tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          Отправить
        </button>
      </div>

      <div className="send-receive-content">
        <div className="input-section">
          <div className="input-label">
            {activeTab === 'request' ? 'Сумма для запроса' : 'Сумма для отправки'}
          </div>
          <div className="input-container">
            <input
              className="input-field"
              type="text"
              value={amount}
              placeholder="0.00"
              readOnly
            />
            <div className="input-currency">USDT</div>
          </div>
        </div>

        <DigitalKeyboard
          onPress={handleKeyPress}
          onDelete={handleDelete}
          onClear={handleClear}
        />

        <button className="generate-button" onClick={handleGenerateLink}>
          {activeTab === 'request' ? 'Создать ссылку запроса' : 'Создать ссылку отправки'}
        </button>

        <div className="history-section">
          <div className="section-title">
            {activeTab === 'request' ? 'Входящие транзакции' : 'Исходящие транзакции'}
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
