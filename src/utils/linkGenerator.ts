import { LinkData } from '../types';

export function generateLinkId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function generateRequestLink(amount?: number): LinkData {
  const id = generateLinkId();
  return {
    id,
    url: `https://metka.one/r/${id}`,
    type: 'request',
    amount,
    createdAt: new Date(),
  };
}

export function generateSendLink(amount?: number): LinkData {
  const id = generateLinkId();
  return {
    id,
    url: `https://metka.one/s/${id}`,
    type: 'send',
    amount,
    createdAt: new Date(),
  };
}

