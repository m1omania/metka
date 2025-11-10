import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon = '→' }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-message">{message}</div>
    </div>
  );
};
