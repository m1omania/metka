# Telegram Mini App для Metka

## Настройка бота

1. Установите зависимости для бота:
```bash
npm install telegraf
```

2. Запустите бота:
```bash
node telegram-bot.js
```

Или с автоперезагрузкой:
```bash
npm install -g nodemon
nodemon telegram-bot.js
```

3. Обновите `WEB_APP_URL` в `telegram-bot.js` на ваш URL приложения

## Настройка бота в Telegram

✅ **Mini App уже настроен!**

Ваше приложение доступно по адресу: [t.me/metkatestapp_bot/metkaapp](https://t.me/metkatestapp_bot/metkaapp)

### Для редактирования настроек:

1. Найдите бота [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/myapps`
3. Выберите вашего бота
4. Выберите приложение для редактирования
5. Можете изменить:
   - Название приложения
   - Описание
   - Иконку (512x512px)
   - URL веб-приложения: `https://metka-zeta.vercel.app`

## Команды бота

- `/start` - Начать работу с ботом
- `/wallet` - Открыть кошелек
- `/help` - Показать справку

## Развертывание бота

### Вариант 1: Локально (для тестирования)
```bash
node telegram-bot.js
```

### Вариант 2: На сервере (Render, Railway, Heroku)
1. Создайте новый сервис
2. Укажите команду запуска: `node telegram-bot.js`
3. Добавьте переменную окружения `BOT_TOKEN` (если используете)

### Вариант 3: Используя вебхуки (рекомендуется для production)
```javascript
// В telegram-bot.js добавьте:
bot.telegram.setWebhook('https://your-domain.com/webhook');
```

## Безопасность

⚠️ **Важно**: Не коммитьте токен бота в публичный репозиторий!

Используйте переменные окружения:
```javascript
const BOT_TOKEN = process.env.BOT_TOKEN || 'your-token-here';
```

## Интеграция с веб-приложением

Веб-приложение уже настроено для работы с Telegram Web App API:
- Автоматическая инициализация при открытии в Telegram
- Поддержка Telegram UI элементов
- Получение данных пользователя из Telegram

