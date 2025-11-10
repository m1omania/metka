export const initTelegram = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }
};

export const setupTelegramUI = () => {
  if (!window.Telegram?.WebApp) return null;
  
  const tg = window.Telegram.WebApp;
  
  // Настройка главной кнопки
  tg.MainButton.setText('Отправить');
  tg.MainButton.color = '#007AFF';
  tg.MainButton.textColor = '#ffffff';
  
  // Настройка кнопки назад
  tg.BackButton.show();
  
  return {
    MainButton: tg.MainButton,
    BackButton: tg.BackButton,
    close: () => tg.close(),
  };
};

export const getTelegramUser = () => {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

// Расширяем Window для TypeScript
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          color: string;
          textColor: string;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
      };
    };
  }
}

