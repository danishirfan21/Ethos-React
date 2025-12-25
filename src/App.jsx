import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Process } from './pages/Process';
import './styles/global.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (items) => {
    setCartItems((prev) => [...prev, ...items]);
    // Auto-open cart after adding items
    setTimeout(() => {
      setIsCartOpen(true);
    }, 200);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <Nav cartCount={cartItems.length} onCartClick={toggleCart} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
      />

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/process" element={<Process />} />
      </Routes>
    </Router>
  );
}

export default App;
