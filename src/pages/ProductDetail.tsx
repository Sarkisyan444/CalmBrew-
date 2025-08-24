import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Product } from '../context/CartContext'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // База данных товаров (в реальном приложении это будет API)
  const productsDatabase: Product[] = [
    {
      id: 1,
      name: 'Зеленый чай "Дракон"',
      description: 'Премиальный зеленый чай с нежным ароматом и мягким вкусом. Этот чай выращивается в высокогорных районах Китая и собирается вручную. Имеет яркий зеленый цвет, свежий аромат и насыщенный вкус с нотками трав и цветов.',
      price: 1200,
      image: '🍃',
      category: 'Зеленый чай',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 2,
      name: 'Черный чай "Эрл Грей"',
      description: 'Классический черный чай с бергамотом. Этот ароматный чай сочетает в себе крепость черного чая с цитрусовым ароматом бергамота. Идеально подходит для утреннего чаепития и подается с молоком или лимоном.',
      price: 950,
      image: '🫖',
      category: 'Черный чай',
      weight: '100г',
      origin: 'Индия'
    },
    {
      id: 3,
      name: 'Улун "Железная Богиня"',
      description: 'Полуферментированный чай с богатым вкусом и сложным ароматом. Этот улун имеет темно-зеленый цвет, насыщенный вкус с нотками меда и фруктов, а также длительное послевкусие.',
      price: 1800,
      image: '🍂',
      category: 'Улун',
      weight: '100г',
      origin: 'Тайвань'
    },
    {
      id: 4,
      name: 'Белый чай "Серебряная Игла"',
      description: 'Нежный белый чай с цветочными нотками. Собирается ранней весной, когда листья еще покрыты белым пушком. Имеет очень мягкий, деликатный вкус с медовыми и цветочными оттенками.',
      price: 2200,
      image: '🌸',
      category: 'Белый чай',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 5,
      name: 'Пуэр "Древний Дерев"',
      description: 'Выдержанный пуэр с землистым вкусом и глубоким ароматом. Этот чай проходит специальную ферментацию и выдержку, что придает ему уникальный вкус и целебные свойства.',
      price: 3500,
      image: '🫘',
      category: 'Пуэр',
      weight: '100г',
      origin: 'Китай'
    },
    {
      id: 6,
      name: 'Ромашковый сбор',
      description: 'Успокаивающий травяной чай с ромашкой. Идеально подходит для вечернего чаепития, помогает расслабиться и улучшает сон. Содержит только натуральные ингредиенты.',
      price: 450,
      image: '🌿',
      category: 'Травяные сборы',
      weight: '100г',
      origin: 'Россия'
    },
    {
      id: 7,
      name: 'Мятный чай',
      description: 'Освежающий чай с перечной мятой. Отлично утоляет жажду, освежает дыхание и помогает при расстройствах желудка. Можно пить как горячим, так и холодным.',
      price: 380,
      image: '🌱',
      category: 'Травяные сборы',
      weight: '100г',
      origin: 'Россия'
    },
    {
      id: 8,
      name: 'Жасминовый улун',
      description: 'Улун с ароматом жасмина. Цветы жасмина добавляются к чайным листьям, создавая нежный, цветочный аромат. Имеет сбалансированный вкус с приятным послевкусием.',
      price: 1600,
      image: '🌺',
      category: 'Улун',
      weight: '100г',
      origin: 'Китай'
    }
  ]

  useEffect(() => {
    const productId = parseInt(id || '0')
    const foundProduct = productsDatabase.find(p => p.id === productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      navigate('/catalog')
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    if (!product) return
    
    setIsAddingToCart(true)
    
    // Добавляем товар в корзину указанное количество раз
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    
    // Показываем уведомление
    setTimeout(() => {
      setIsAddingToCart(false)
      alert(`Добавлено в корзину: ${product.name} x${quantity}`)
    }, 1000)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <div className="text-center" style={{ padding: '40px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
        <p>Загружаем информацию о товаре...</p>
      </div>
    )
  }

  return (
    <div className="ProductDetail">
      {/* Хлебные крошки */}
      <div className="mb-4" style={{ opacity: 0.7 }}>
        <button
          onClick={() => navigate('/catalog')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--tg-theme-link-color, #0088cc)',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Назад к каталогу
        </button>
      </div>

      {/* Основная информация о товаре */}
      <div className="card mb-6">
        <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
          {/* Изображение */}
          <div style={{ flex: '1', minWidth: '200px', textAlign: 'center' }}>
            <div style={{ fontSize: '120px', marginBottom: '16px' }}>
              {product.image}
            </div>
            <div style={{ 
              background: 'var(--tg-theme-secondary-bg-color, #f8f9fa)', 
              padding: '8px 16px', 
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '14px',
              opacity: 0.8
            }}>
              {product.category}
            </div>
          </div>
          
          {/* Информация */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>{product.name}</h1>
            
            <div className="mb-4">
              <span style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'var(--tg-theme-button-color, #0088cc)' 
              }}>
                {product.price} ₽
              </span>
              <span style={{ opacity: 0.6, marginLeft: '8px' }}>за {product.weight}</span>
            </div>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>
            
            <div className="mb-4">
              <strong>Происхождение:</strong> {product.origin}
            </div>
            
            {/* Выбор количества */}
            <div className="mb-6">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Количество:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--tg-theme-hint-color, #999999)',
                    borderRadius: '6px',
                    background: 'var(--tg-theme-bg-color, #ffffff)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  -
                </button>
                
                <span style={{ 
                  minWidth: '60px', 
                  textAlign: 'center', 
                  fontSize: '18px',
                  fontWeight: 'bold' 
                }}>
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--tg-theme-hint-color, #999999)',
                    borderRadius: '6px',
                    background: 'var(--tg-theme-bg-color, #ffffff)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Кнопки действий */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="btn"
                style={{ flex: '2' }}
              >
                {isAddingToCart ? 'Добавляем...' : `В корзину за ${product.price * quantity} ₽`}
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="btn"
                style={{ 
                  flex: '1',
                  background: 'var(--tg-theme-secondary-bg-color, #f8f9fa)',
                  color: 'var(--tg-theme-text-color, #000000)'
                }}
              >
                Корзина
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="card mb-6">
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Как заваривать</h3>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ marginBottom: '8px', color: 'var(--tg-theme-button-color, #0088cc)' }}>
              Температура воды
            </h4>
            <p>70-80°C для зеленого и белого чая, 90-100°C для черного и улуна</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ marginBottom: '8px', color: 'var(--tg-theme-button-color, #0088cc)' }}>
              Время заваривания
            </h4>
            <p>2-3 минуты для большинства сортов, 5-7 минут для пуэра</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ marginBottom: '8px', color: 'var(--tg-theme-button-color, #0088cc)' }}>
              Количество заварки
            </h4>
            <p>1 чайная ложка на чашку (200-250 мл)</p>
          </div>
        </div>
      </div>

      {/* Похожие товары */}
      <div className="card">
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Похожие товары</h3>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          {productsDatabase
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3)
            .map((similarProduct) => (
              <div 
                key={similarProduct.id} 
                className="card" 
                style={{ 
                  flex: '1', 
                  minWidth: '200px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onClick={() => navigate(`/product/${similarProduct.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div className="text-center">
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                    {similarProduct.image}
                  </div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    {similarProduct.name}
                  </h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--tg-theme-button-color, #0088cc)' }}>
                    {similarProduct.price} ₽
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
