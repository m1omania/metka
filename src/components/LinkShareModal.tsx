import React, { useState } from 'react';
import { QRCodeModal } from './QRCodeModal';
import './LinkShareModal.css';

interface LinkShareModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
}

export const LinkShareModal: React.FC<LinkShareModalProps> = ({
  visible,
  url,
  onClose,
}) => {
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Ссылка скопирована в буфер обмена');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="link-modal-overlay" onClick={onClose}>
        <div className="link-modal-container" onClick={(e) => e.stopPropagation()}>
          <h2 className="link-modal-title">Ссылка</h2>
          <div className="link-modal-url-container">
            <div className="link-modal-url-text">{url}</div>
          </div>
          <div className="link-modal-buttons">
            <button className="link-modal-button link-modal-button-primary" onClick={copyToClipboard}>
              Копировать
            </button>
            <button className="link-modal-button link-modal-button-secondary" onClick={() => setShowQR(true)}>
              Показать QR-код
            </button>
            <button className="link-modal-button link-modal-button-tertiary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
      <QRCodeModal
        visible={showQR}
        url={url}
        onClose={() => setShowQR(false)}
      />
    </>
  );
};
