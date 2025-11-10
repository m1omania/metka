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

1. Найдите бота [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot` и следуйте инструкциям
3. После создания бота, отправьте команду `/newapp`
4. Выберите вашего бота
5. Укажите название приложения и описание
6. Загрузите иконку (512x512px)
7. Укажите URL вашего веб-приложения: `https://metka-zeta.vercel.app`
8. Сохраните полученный токен

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

