const { Telegraf } = require('telegraf');

// Используйте переменную окружения для токена
const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const WEB_APP_URL = 'https://metka-zeta.vercel.app'; // Замените на ваш URL

const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  ctx.reply('Добро пожаловать в Metka! 🚀\n\nВаш кошелек для работы с USDT.', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть кошелек',
            web_app: { url: WEB_APP_URL }
          }
        ]
      ]
    }
  });
});

// Команда /help
bot.help((ctx) => {
  ctx.reply(
    'Доступные команды:\n' +
    '/start - Начать работу с ботом\n' +
    '/wallet - Открыть кошелек\n' +
    '/help - Показать справку'
  );
});

// Команда /wallet
bot.command('wallet', (ctx) => {
  ctx.reply('Откройте кошелек:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть кошелек',
            web_app: { url: WEB_APP_URL }
          }
        ]
      ]
    }
  });
});

// Обработка callback от кнопок
bot.on('callback_query', (ctx) => {
  ctx.answerCbQuery();
});

// Запуск бота
bot.launch().then(() => {
  console.log('Bot started successfully!');
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

