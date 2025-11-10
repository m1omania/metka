import React, { useState } from 'react';
import './WalletAddress.css';

interface WalletAddressProps {
  address: string;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      alert('Адрес кошелька скопирован в буфер обмена');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="wallet-address">
      <div className="wallet-address-label">Адрес кошелька</div>
      <div className="wallet-address-container" onClick={copyToClipboard}>
        <div className="wallet-address-text">{shortAddress}</div>
        <div className="wallet-address-copy">{copied ? '✓' : '📋'}</div>
      </div>
    </div>
  );
};
