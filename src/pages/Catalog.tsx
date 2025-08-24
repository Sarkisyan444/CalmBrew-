import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Product } from '../context/CartContext'

const Catalog: React.FC = () => {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'price-desc'>('name')

  // Полный каталог товаров
  const allProducts: Product[] = [
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
    },
    {
      id: 4,
      name: 'Белый чай "Серебряная Игла"',
      description: 'Нежный белый чай с цветочными нотками',
      price: 2200,
      image: '🌸',
      category: 'Белый чай',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 5,
      name: 'Пуэр "Древний Дерев"',
      description: 'Выдержанный пуэр с землистым вкусом',
      price: 3500,
      image: '🫘',
      category: 'Пуэр',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 6,
      name: 'Ромашковый сбор',
      description: 'Успокаивающий травяной чай с ромашкой',
      price: 450,
      image: '🌿',
      category: 'Травяные сборы',
      weight: '100г',
      origin: 'Россия'
    },
    {
      id: 7,
      name: 'Мятный чай',
      description: 'Освежающий чай с перечной мятой',
      price: 380,
      image: '🌱',
      category: 'Травяные сборы',
      weight: '100г',
      origin: 'Россия'
    },
    {
      id: 8,
      name: 'Жасминовый улун',
      description: 'Улун с ароматом жасмина',
      price: 1600,
      image: '🌺',
      category: 'Улун',
      weight: '100г',
      origin: 'Китай'
    }
  ]

  const categories = ['all', 'Зеленый чай', 'Черный чай', 'Улун', 'Белый чай', 'Пуэр', 'Травяные сборы']

  // Фильтрация и сортировка товаров
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="Catalog">
      <h1 className="text-center mb-4" style={{ fontSize: '28px' }}>
        Каталог чая
      </h1>

      {/* Фильтры */}
      <div className="card mb-4">
        <div className="flex gap-4" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Поиск */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Категории */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Все категории' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Сортировка */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--tg-theme-hint-color, #999999)',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            >
              <option value="name">По названию</option>
              <option value="price">По цене (возрастание)</option>
              <option value="price-desc">По цене (убывание)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Результаты поиска */}
      <div className="mb-4">
        <p style={{ opacity: 0.7 }}>
          Найдено товаров: {filteredAndSortedProducts.length}
        </p>
      </div>

      {/* Список товаров */}
      <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="card" style={{ flex: '1', minWidth: '300px' }}>
            <div className="text-center mb-4">
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                {product.image}
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{product.name}</h3>
              <p style={{ opacity: 0.7, marginBottom: '16px' }}>{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tg-theme-button-color, #0088cc)' }}>
                  {product.price} ₽
                </span>
                <span style={{ opacity: 0.6 }}>{product.weight}</span>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <span style={{ 
                  background: 'var(--tg-theme-secondary-bg-color, #f8f9fa)', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  {product.category}
                </span>
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

      {/* Пустое состояние */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center" style={{ padding: '40px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Товары не найдены</h3>
          <p style={{ opacity: 0.7, marginBottom: '16px' }}>
            Попробуйте изменить параметры поиска или категорию
          </p>
          <button 
            className="btn"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  )
}

export default Catalog
