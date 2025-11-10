export const theme = {
  colors: {
    primary: '#007AFF',
    primaryDark: '#0051D5',
    background: '#FFFFFF',
    backgroundDark: '#000000',
    surface: '#F5F5F7',
    surfaceDark: '#1C1C1E',
    text: '#000000',
    textSecondary: '#8E8E93',
    textDark: '#FFFFFF',
    textSecondaryDark: '#8E8E93',
    border: '#E5E5EA',
    borderDark: '#38383A',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    disabled: '#C7C7CC',
    disabledDark: '#3A3A3C',
  },
  typography: {
    balance: {
      fontSize: '64px',
      fontWeight: '800',
      lineHeight: '76px',
    },
    balanceSecondary: {
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '24px',
    },
    h1: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '38px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '28px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '24px',
    },
    body: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '22px',
    },
    bodySmall: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16px',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    round: '9999px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
};

export type Theme = typeof theme;
