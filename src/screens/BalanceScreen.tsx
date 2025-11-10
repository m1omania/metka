import React, { useState, useEffect } from 'react';
import { Wallet, Transaction } from '../types';
import { BalanceDisplay } from '../components/BalanceDisplay';
import { WalletAddress } from '../components/WalletAddress';
import { TransactionHistory } from '../components/TransactionHistory';
import { WalletService } from '../services/walletService';
import './BalanceScreen.css';

export const BalanceScreen: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const walletData = await WalletService.getWallet();
    const transactionsData = await WalletService.getTransactions();
    setWallet(walletData);
    setTransactions(transactionsData);
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
    </div>
  );
};
