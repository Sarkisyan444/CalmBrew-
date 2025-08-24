import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WebApp } from '@twa-dev/sdk'
import Header from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import { CartProvider } from './context/CartContext'

function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    WebApp.ready()
    WebApp.expand()
    
    // Установка темы
    WebApp.setHeaderColor(WebApp.themeParams.secondary_bg_color || '#f8f9fa')
    WebApp.setBackgroundColor(WebApp.themeParams.bg_color || '#ffffff')
  }, [])

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
