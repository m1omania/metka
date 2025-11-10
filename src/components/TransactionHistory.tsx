import React from 'react';
import { Transaction } from '../types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  XCircleIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import './TransactionHistory.css';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onTransactionPress,
}) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status: string, type: string) => {
    if (status === 'pending') return <ClockIcon className="transaction-icon-svg" />;
    if (status === 'failed') return <XCircleIcon className="transaction-icon-svg" />;
    return type === 'incoming' ? (
      <ArrowDownIcon className="transaction-icon-svg" />
    ) : (
      <ArrowUpIcon className="transaction-icon-svg" />
    );
  };

  const getStatusColor = (status: string): string => {
    if (status === 'completed') return '#34C759';
    if (status === 'pending') return '#FF9500';
    return '#FF3B30';
  };

  const handleBlockchainPress = (link?: string) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-history-empty">
        <div className="transaction-history-empty-text">История операций пуста</div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <h3 className="transaction-history-title">История</h3>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="transaction-item"
          onClick={() => onTransactionPress?.(transaction)}
        >
          <div className="transaction-left">
            <div className="transaction-icon">{getStatusIcon(transaction.status, transaction.type)}</div>
            <div className="transaction-info">
              <div className="transaction-type">
                {transaction.type === 'incoming' ? 'Получено' : 'Отправлено'}
              </div>
              <div className="transaction-date">{formatDate(transaction.date)}</div>
            </div>
          </div>
          <div className="transaction-right">
            <div
              className="transaction-amount"
              style={{
                color: transaction.type === 'incoming' ? '#34C759' : '#000000',
              }}
            >
              {transaction.type === 'incoming' ? '+' : '-'}
              {formatAmount(transaction.amount)} USDT
            </div>
            <div className="transaction-status">
              <div
                className="status-dot"
                style={{ backgroundColor: getStatusColor(transaction.status) }}
              />
              <div className="status-text">
                {transaction.status === 'completed'
                  ? 'Завершено'
                  : transaction.status === 'pending'
                  ? 'В обработке'
                  : 'Ошибка'}
              </div>
            </div>
          </div>
          {transaction.blockchainLink && (
            <button
              className="blockchain-button"
              onClick={(e) => {
                e.stopPropagation();
                handleBlockchainPress(transaction.blockchainLink);
              }}
            >
              <LinkIcon className="blockchain-icon" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
