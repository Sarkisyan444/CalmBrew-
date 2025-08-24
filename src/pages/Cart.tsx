import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { WebApp } from '@twa-dev/sdk'

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (state.items.length === 0) return
    
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    setIsCheckingOut(true)
    
    // Имитация отправки заказа
    setTimeout(() => {
      const orderText = `🍵 Новый заказ!\n\n` +
        `Товары:\n${state.items.map(item => 
          `• ${item.product.name} x${item.quantity} - ${item.product.price * item.quantity}₽`
        ).join('\n')}\n\n` +
        `Итого: ${state.total}₽\n\n` +
        `Доставка:\n` +
        `Имя: ${deliveryInfo.name}\n` +
        `Телефон: ${deliveryInfo.phone}\n` +
        `Адрес: ${deliveryInfo.address}\n` +
        `Комментарий: ${deliveryInfo.comment || 'Нет'}`

      // Отправка в Telegram (в реальном приложении здесь будет API)
      WebApp.sendData(JSON.stringify({
        type: 'order',
        items: state.items,
        total: state.total,
        delivery: deliveryInfo
      }))

      alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.')
      clearCart()
      setDeliveryInfo({ name: '', phone: '', address: '', comment: '' })
      setIsCheckingOut(false)
    }, 2000)
  }

  if (state.items.length === 0) {
    return (
      <div className="Cart text-center" style={{ padding: '40px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Корзина пуста</h2>
        <p style={{ opacity: 0.7, marginBottom: '24px' }}>
          Добавьте товары из каталога, чтобы сделать заказ
        </p>
        <a href="/catalog" className="btn">
          Перейти в каталог
        </a>
      </div>
    )
  }

  return (
    <div className="Cart">
      <h1 className="text-center mb-4" style={{ fontSize: '28px' }}>
        Корзина
      </h1>

      {/* Список товаров */}
      <div className="mb-6">
        {state.items.map((item) => (
          <div key={item.product.id} className="card mb-4">
            <div className="flex items-center gap-4">
              <div style={{ fontSize: '48px' }}>
                {item.product.image}
              </div>
              
              <div style={{ flex: '1' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>
                  {item.product.name}
                </h3>
                <p style={{ opacity: 0.7, marginBottom: '8px' }}>
                  {item.product.weight} • {item.product.category}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {item.product.price} ₽
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid var(--tg-theme-hint-color, #999999)',
                        borderRadius: '4px',
                        background: 'var(--tg-theme-bg-color, #ffffff)',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    
                    <span style={{ minWidth: '40px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid var(--tg-theme-hint-color, #999999)',
                        borderRadius: '4px',
                        background: 'var(--tg-theme-bg-color, #ffffff)',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {item.product.price * item.quantity} ₽
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  style={{
                    padding: '4px 8px',
                    border: 'none',
                    borderRadius: '4px',
                    background: 'var(--tg-theme-destructive-text-color, #ff4444)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итого */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize: '20px' }}>Итого товаров:</h3>
          <span style={{ fontSize: '18px' }}>
            {state.items.reduce((total, item) => total + item.quantity, 0)} шт.
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>Сумма заказа:</h3>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--tg-theme-button-color, #0088cc)' }}>
            {state.total} ₽
          </span>
        </div>
      </div>

      {/* Форма доставки */}
      <div className="card mb-6">
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Информация о доставке</h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Имя * <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={deliveryInfo.name}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
              placeholder="Ваше имя"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Телефон * <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="tel"
              value={deliveryInfo.phone}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Адрес доставки * <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              value={deliveryInfo.address}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
              placeholder="Улица, дом, квартира"
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Комментарий к заказу
            </label>
            <textarea
              value={deliveryInfo.comment}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, comment: e.target.value })}
              placeholder="Дополнительная информация"
              rows={2}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={clearCart}
          className="btn"
          style={{
            background: 'var(--tg-theme-destructive-text-color, #ff4444)',
            flex: '1'
          }}
        >
          Очистить корзину
        </button>
        
        <button
          onClick={handleCheckout}
          className="btn"
          disabled={isCheckingOut}
          style={{ flex: '2' }}
        >
          {isCheckingOut ? 'Оформляем заказ...' : 'Оформить заказ'}
        </button>
      </div>

      {/* Информация о доставке */}
      <div className="card text-center" style={{ opacity: 0.8 }}>
        <h4 style={{ marginBottom: '8px' }}>🚚 Доставка</h4>
        <p style={{ fontSize: '14px' }}>
          Доставляем по всему городу в течение 2 часов. 
          Минимальная сумма заказа: 500₽
        </p>
      </div>
    </div>
  )
}

export default Cart
