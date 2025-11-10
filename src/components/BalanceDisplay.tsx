import React from 'react';
import './BalanceDisplay.css';

interface BalanceDisplayProps {
  balance: number;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
}) => {
  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="balance-display">
      <div className="balance-label">Ваш баланс</div>
      <div className="balance-text">{formatBalance(balance)}</div>
      <div className="currency-text">USDT</div>
    </div>
  );
};
