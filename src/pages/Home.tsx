import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Product } from '../context/CartContext'

const Home: React.FC = () => {
  const { addItem } = useCart()

  // Популярные товары для демонстрации
  const popularProducts: Product[] = [
    {
      id: 1,
      name: 'Зеленый чай "Дракон"',
      description: 'Премиальный зеленый чай с нежным ароматом и мягким вкусом',
      price: 1200,
      image: '🍃',
      category: 'Зеленый чай',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 2,
      name: 'Черный чай "Эрл Грей"',
      description: 'Классический черный чай с бергамотом',
      price: 950,
      image: '🫖',
      category: 'Черный чай',
      weight: '100г',
      origin: 'Индия'
    },
    {
      id: 3,
      name: 'Улун "Железная Богиня"',
      description: 'Полуферментированный чай с богатым вкусом',
      price: 1800,
      image: '🍂',
      category: 'Улун',
      weight: '100г',
      origin: 'Тайвань'
    }
  ]

  return (
    <div className="Home">
      {/* Hero Section */}
      <section className="text-center mb-8" style={{ padding: '40px 0' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>
          Добро пожаловать в Чайную Лавку! 🍵
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '24px', opacity: 0.8 }}>
          Откройте для себя мир изысканных чаев со всего света
        </p>
        <Link to="/catalog" className="btn">
          Перейти в каталог
        </Link>
      </section>

      {/* Features */}
      <section className="mb-8">
        <h2 className="text-center mb-4" style={{ fontSize: '24px' }}>
          Почему выбирают нас?
        </h2>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>🌿 Натуральность</h3>
            <p>100% натуральные ингредиенты без искусственных добавок</p>
          </div>
          <div className="card" style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>🚚 Быстрая доставка</h3>
            <p>Доставляем по всему городу в течение 2 часов</p>
          </div>
          <div className="card" style={{ flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>💎 Качество</h3>
            <p>Тщательно отбираем только лучшие сорта чая</p>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="mb-8">
        <h2 className="text-center mb-4" style={{ fontSize: '24px' }}>
          Популярные товары
        </h2>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          {popularProducts.map((product) => (
            <div key={product.id} className="card" style={{ flex: '1', minWidth: '280px' }}>
              <div className="text-center mb-4">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {product.image}
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ opacity: 0.7, marginBottom: '16px' }}>{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {product.price} ₽
                  </span>
                  <span style={{ opacity: 0.6 }}>{product.weight}</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="btn"
                    style={{ flex: '1', textDecoration: 'none' }}
                  >
                    Подробнее
                  </Link>
                  <button 
                    className="btn"
                    onClick={() => addItem(product)}
                    style={{ flex: '1' }}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="text-center mb-4" style={{ fontSize: '24px' }}>
          Категории чая
        </h2>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          {[
            { name: 'Зеленый чай', icon: '🍃', color: '#4ade80' },
            { name: 'Черный чай', icon: '🫖', color: '#92400e' },
            { name: 'Улун', icon: '🍂', color: '#f59e0b' },
            { name: 'Белый чай', icon: '🌸', color: '#f3f4f6' },
            { name: 'Пуэр', icon: '🫘', color: '#78350f' },
            { name: 'Травяные сборы', icon: '🌿', color: '#10b981' }
          ].map((category, index) => (
            <Link
              key={index}
              to="/catalog"
              className="card"
              style={{
                flex: '1',
                minWidth: '150px',
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
                border: `2px solid ${category.color}`,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                {category.icon}
              </div>
              <h3 style={{ fontSize: '16px' }}>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
