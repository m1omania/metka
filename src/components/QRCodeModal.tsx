import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './QRCodeModal.css';

interface QRCodeModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  visible,
  url,
  onClose,
}) => {
  const [qrDataUri, setQrDataUri] = useState<string>('');

  useEffect(() => {
    if (visible && url) {
      QRCode.toDataURL(url, { width: 250, margin: 1 })
        .then((dataUri) => setQrDataUri(dataUri))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [visible, url]);

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
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="qr-modal-title">QR-код</h2>
        <div className="qr-modal-qr-container">
          {qrDataUri ? (
            <img src={qrDataUri} alt="QR Code" className="qr-modal-image" />
          ) : (
            <div className="qr-modal-loading">Загрузка...</div>
          )}
        </div>
        <div className="qr-modal-url">{url}</div>
        <div className="qr-modal-buttons">
          <button className="qr-modal-button qr-modal-button-primary" onClick={copyToClipboard}>
            Копировать ссылку
          </button>
          <button className="qr-modal-button qr-modal-button-secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
