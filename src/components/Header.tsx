import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { WebApp } from '@twa-dev/sdk'

const Header: React.FC = () => {
  const { state } = useCart()
  const location = useLocation()
  
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const handleBackButton = () => {
    if (location.pathname !== '/') {
      WebApp.BackButton.show()
    } else {
      WebApp.BackButton.hide()
    }
  }

  React.useEffect(() => {
    handleBackButton()
  }, [location])

  return (
    <header style={{
      background: 'var(--tg-theme-secondary-bg-color, #f8f9fa)',
      borderBottom: '1px solid var(--tg-theme-hint-color, #999999)',
      padding: '16px 0'
    }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--tg-theme-text-color, #000000)'
            }}>
              🍵 Чайная Лавка
            </h1>
          </Link>
          
          <nav className="flex gap-4">
            <Link 
              to="/catalog" 
              className="btn"
              style={{ textDecoration: 'none' }}
            >
              Каталог
            </Link>
            
            <Link 
              to="/cart" 
              className="btn"
              style={{ textDecoration: 'none', position: 'relative' }}
            >
              🛒 Корзина
              {cartItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--tg-theme-destructive-text-color, #ff4444)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
