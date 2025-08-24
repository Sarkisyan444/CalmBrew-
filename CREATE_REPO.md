# 📝 Создание GitHub репозитория

## 🔗 Шаг 1: Создайте репозиторий на GitHub

1. **Откройте браузер** и перейдите на [github.com](https://github.com)
2. **Войдите в аккаунт** (или создайте, если его нет)
3. **Нажмите зеленую кнопку "New"** или "+" в правом верхнем углу
4. **Выберите "New repository"**

## 📋 Шаг 2: Настройте репозиторий

**Repository name:** `tea-shop-mini-app`  
**Description:** `Telegram Mini App для продажи чая`  
**Visibility:** Public ✅  
**Initialize this repository with:** НЕ ставьте галочки

## 🔗 Шаг 3: Создайте репозиторий

Нажмите **"Create repository"**

## 📤 Шаг 4: Загрузите код

После создания репозитория GitHub покажет инструкции. Выполните:

```bash
# В папке проекта (у вас уже выполнено)
git remote add origin https://github.com/YOUR_USERNAME/tea-shop-mini-app.git
git branch -M main
git push -u origin main
```

## 🌐 Шаг 5: Разверните на Vercel

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите ваш репозиторий `tea-shop-mini-app`
5. Нажмите "Import"
6. Настройки:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Нажмите "Deploy"

## 🎯 Результат

После развертывания вы получите URL вида:
`https://tea-shop-mini-app.vercel.app`

Этот URL нужно будет указать в настройках Mini App в Telegram.

---

**⚠️ Важно:** Замените `YOUR_USERNAME` на ваше реальное имя пользователя GitHub!
