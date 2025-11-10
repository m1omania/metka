import React from 'react';
import './DigitalKeyboard.css';

interface DigitalKeyboardProps {
  onPress: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const DigitalKeyboard: React.FC<DigitalKeyboardProps> = ({
  onPress,
  onDelete,
  onClear,
}) => {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  const handlePress = (value: string) => {
    if (value === '⌫') {
      onDelete();
    } else {
      onPress(value);
    }
  };

  return (
    <div className="digital-keyboard">
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((num) => (
            <button
              key={num}
              className={`keyboard-key ${num === '⌫' ? 'delete-key' : ''}`}
              onClick={() => handlePress(num)}
            >
              {num}
            </button>
          ))}
        </div>
      ))}
      <button className="clear-button" onClick={onClear}>
        Очистить
      </button>
    </div>
  );
};
