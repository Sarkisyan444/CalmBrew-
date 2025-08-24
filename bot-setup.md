# 🤖 Настройка Telegram бота для Mini App

## Шаг 1: Создание бота

1. Напишите [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Введите название бота (например: "Чайная Лавка")
4. Введите username бота (например: "tea_shop_bot")
5. Сохраните токен бота (BOT_TOKEN)

## Шаг 2: Создание Mini App

1. Отправьте команду `/newapp` боту @BotFather
2. Выберите вашего бота из списка
3. Введите название Mini App: "Чайная Лавка"
4. Введите описание: "Магазин изысканных чаев с доставкой"
5. Получите ссылку на Mini App

## Шаг 3: Настройка меню бота

Отправьте команду `/setcommands` и добавьте:

```
start - 🍵 Добро пожаловать в Чайную Лавку
catalog - 📚 Каталог чая
cart - 🛒 Корзина
help - ❓ Помощь
```

## Шаг 4: Настройка кнопки меню

Отправьте команду `/setmenubutton` и настройте:

```
text: "🍵 Открыть магазин"
web_app: "https://your-domain.com"
```

## Шаг 5: Обработка заказов

В вашем боте добавьте обработчик для получения данных от Mini App:

```python
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters
import json

async def handle_webapp_data(update: Update, context):
    """Обработка данных от Mini App"""
    if update.message and update.message.web_app_data:
        data = json.loads(update.message.web_app_data.data)
        
        if data.get('type') == 'order':
            # Обработка заказа
            items = data.get('items', [])
            total = data.get('total', 0)
            delivery = data.get('delivery', {})
            
            # Формируем сообщение о заказе
            order_text = f"🍵 Новый заказ!\n\n"
            order_text += f"Товары:\n"
            for item in items:
                order_text += f"• {item['product']['name']} x{item['quantity']} - {item['product']['price'] * item['quantity']}₽\n"
            
            order_text += f"\nИтого: {total}₽\n\n"
            order_text += f"Доставка:\n"
            order_text += f"Имя: {delivery.get('name', 'Не указано')}\n"
            order_text += f"Телефон: {delivery.get('phone', 'Не указано')}\n"
            order_text += f"Адрес: {delivery.get('address', 'Не указано')}\n"
            order_text += f"Комментарий: {delivery.get('comment', 'Нет')}"
            
            # Отправляем заказ в чат администратора
            await context.bot.send_message(
                chat_id=ADMIN_CHAT_ID,  # ID чата администратора
                text=order_text
            )
            
            # Подтверждаем заказ пользователю
            await update.message.reply_text(
                "✅ Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время."
            )

async def start(update: Update, context):
    """Команда /start"""
    welcome_text = """
🍵 Добро пожаловать в Чайную Лавку!

У нас вы найдете:
• Изысканные сорта чая со всего света
• Быструю доставку по городу
• Профессиональные консультации

Нажмите кнопку меню, чтобы открыть магазин!
    """
    
    await update.message.reply_text(welcome_text)

async def help_command(update: Update, context):
    """Команда /help"""
    help_text = """
❓ Как пользоваться магазином:

1. Нажмите кнопку "🍵 Открыть магазин"
2. Выберите понравившиеся сорта чая
3. Добавьте их в корзину
4. Оформите заказ с указанием адреса доставки

🚚 Доставка осуществляется в течение 2 часов по всему городу.

📞 По вопросам: @admin_username
    """
    
    await update.message.reply_text(help_text)

def main():
    """Основная функция бота"""
    # Инициализация бота
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_webapp_data))
    
    # Запускаем бота
    application.run_polling()

if __name__ == '__main__':
    main()
```

## Шаг 6: Переменные окружения

Создайте файл `.env`:

```env
BOT_TOKEN=your_bot_token_here
ADMIN_CHAT_ID=your_admin_chat_id_here
```

## Шаг 7: Развертывание бота

### Локально
```bash
python bot.py
```

### На хостинге (PythonAnywhere, Heroku, VPS)
1. Загрузите код бота
2. Установите зависимости: `pip install python-telegram-bot`
3. Запустите: `python bot.py`

## Шаг 8: Тестирование

1. Запустите бота
2. Отправьте команду `/start`
3. Откройте Mini App через кнопку меню
4. Сделайте тестовый заказ
5. Проверьте получение данных в боте

## Полезные команды BotFather

- `/mybots` - список ваших ботов
- `/setdescription` - изменить описание бота
- `/setabouttext` - изменить информацию о боте
- `/setuserpic` - изменить аватар бота
- `/setcommands` - настроить команды
- `/setmenubutton` - настроить кнопку меню

## Безопасность

- Никогда не публикуйте токен бота
- Используйте HTTPS для Mini App
- Валидируйте все входящие данные
- Ограничьте доступ к админским функциям

## Поддержка

Если возникли проблемы:
1. Проверьте логи бота
2. Убедитесь в правильности токена
3. Проверьте настройки Mini App
4. Обратитесь к документации Telegram Bot API
