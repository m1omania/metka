import { Wallet, Transaction } from '../types';
import { mockWallet, mockTransactions, mockUser } from './mockData';

const WALLET_KEY = 'wallet_data';
const TRANSACTIONS_KEY = 'transactions_data';
const USER_KEY = 'user_data';

export class WalletService {
  static async getWallet(): Promise<Wallet> {
    try {
      const data = localStorage.getItem(WALLET_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(WALLET_KEY, JSON.stringify(mockWallet));
      return mockWallet;
    } catch (error) {
      console.error('Error getting wallet:', error);
      return mockWallet;
    }
  }

  static async getTransactions(): Promise<Transaction[]> {
    try {
      const data = localStorage.getItem(TRANSACTIONS_KEY);
      if (data) {
        const transactions = JSON.parse(data);
        return transactions.map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
      }
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
      return mockTransactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      return mockTransactions;
    }
  }

  static async addTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      transactions.unshift(transaction);
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }

  static async getUser(): Promise<typeof mockUser> {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error('Error getting user:', error);
      return mockUser;
    }
  }

  static async updateUser(userData: Partial<typeof mockUser>): Promise<void> {
    try {
      const user = await this.getUser();
      const updated = { ...user, ...userData };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
