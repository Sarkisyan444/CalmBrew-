# 🚀 Активация системы непрерывного развертывания

## 📋 Что нужно сделать СЕЙЧАС:

### 1. 🆕 Создать GitHub репозиторий

```bash
# В GitHub создайте новый репозиторий:
# Название: CalmBrew- (у вас уже есть!)
# Описание: Telegram Mini App для чайного магазина
# Публичный: Да
# README: Да
# .gitignore: Node
# Лицензия: MIT
```

### 2. 🔗 Подключить локальный проект

```bash
# В вашей папке проекта выполните:
git remote add origin https://github.com/Sarkisyan444/CalmBrew-.git
git branch -M main
git add .
git commit -m "🚀 Initial commit: Tea Shop Mini App"
git push -u origin main
```

### 3. ⚙️ Настроить GitHub Pages

1. Перейдите в репозиторий на GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main, Folder: / (root)
5. Save

### 4. 🔐 Настроить GitHub Actions

1. Перейдите в репозиторий
2. Actions → New workflow
3. Выберите "set up a workflow yourself"
4. Скопируйте содержимое файла `.github/workflows/deploy.yml`
5. Commit changes

## ✅ После активации:

### Автоматически будет работать:
- 🚀 **Развертывание** при каждом push
- ⏰ **Проверки** каждые 6 часов  
- 🔒 **Обновления** зависимостей каждые 24 часа
- 📊 **Мониторинг** каждые 30 минут

### Проверить работу:
```bash
# Запустить мониторинг
python3 check_status.py

# Открыть GitHub Actions
# https://github.com/sarkisisraelyan/tea-shop-mini-app/actions
```

## 🌐 Результат:

После активации ваш чайный магазин будет:
- **Работать 24/7** без перерывов
- **Автоматически обновляться** при изменениях
- **Мониториться** и уведомлять о проблемах
- **Развертываться** на GitHub Pages

## 🚨 Если что-то не работает:

1. **Проверьте Actions** - должны быть зеленые галочки
2. **Проверьте Pages** - должен быть активен
3. **Проверьте мониторинг** - `python3 check_status.py`
4. **Посмотрите логи** в GitHub Actions

## 📱 Telegram Bot:

После активации:
1. Напишите @BotFather
2. Команда: `/setmenubutton`
3. Выберите @CalmBrew_Bot
4. Текст: 🍵 Открыть магазин
5. URL: https://sarkisisraelyan.github.io/CalmBrew-

---

**🎯 Цель: Полностью автоматизированный чайный магазин, работающий 24/7!**
