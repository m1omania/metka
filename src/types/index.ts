export type TransactionType = 'incoming' | 'outgoing' | 'pending';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  status: TransactionStatus;
  type: TransactionType;
  blockchainLink?: string;
  address?: string;
}

export interface Wallet {
  address: string;
  balance: number;
  promoBalance: number;
}

export interface LinkData {
  id: string;
  url: string;
  type: 'request' | 'send';
  amount?: number;
  createdAt: Date;
}

