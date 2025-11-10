import { Transaction, Wallet } from '../types';

export const mockWallet: Wallet = {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  balance: 1250.50,
  promoBalance: 50,
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 250.00,
    date: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    type: 'incoming',
    blockchainLink: 'https://etherscan.io/tx/0x123...',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  },
  {
    id: '2',
    amount: 100.50,
    date: new Date('2024-01-14T15:20:00'),
    status: 'completed',
    type: 'outgoing',
    blockchainLink: 'https://etherscan.io/tx/0x456...',
    address: '0x8ba1f109551bD432803012645Hac136c22C1729',
  },
  {
    id: '3',
    amount: 500.00,
    date: new Date('2024-01-13T09:15:00'),
    status: 'completed',
    type: 'incoming',
    blockchainLink: 'https://etherscan.io/tx/0x789...',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  },
  {
    id: '4',
    amount: 75.25,
    date: new Date('2024-01-12T14:45:00'),
    status: 'pending',
    type: 'outgoing',
    address: '0x9cA8eF8bB19c77C5b5e0D5b8aF8B19c77C5b5e0D5b',
  },
  {
    id: '5',
    amount: 325.75,
    date: new Date('2024-01-11T11:00:00'),
    status: 'completed',
    type: 'incoming',
    blockchainLink: 'https://etherscan.io/tx/0xabc...',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  },
];

export const mockUser = {
  email: 'user@example.com',
  hasBackup: true,
  biometricEnabled: false,
};

