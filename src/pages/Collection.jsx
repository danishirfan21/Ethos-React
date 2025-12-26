import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Collection.css';

export const Collection = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [quantityModal, setQuantityModal] = useState(null); // Stores selected product
  const [modalQuantity, setModalQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: 'The Apex Dripper v2',
      category: 'Brewing / Manual Pour Over',
      price: 145.0,
      image:
        'https://images.unsplash.com/photo-1565845103399-89ff0425d093?auto=format&fit=crop&q=80&w=800',
      link: '/',
    },
    {
      id: 2,
      name: 'Precision Grinder Pro',
      category: 'Grinders / Burr Mill',
      price: 385.0,
      image:
        'https://plus.unsplash.com/premium_photo-1664189122777-01ad20e7fb9a?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      name: 'Gooseneck Kettle',
      category: 'Brewing / Temperature Control',
      price: 165.0,
      image:
        'https://plus.unsplash.com/premium_photo-1661661077686-0eef16b3d395?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      name: 'Glass Carafe Set',
      category: 'Accessories / Serving',
      price: 95.0,
      image:
        'https://images.unsplash.com/photo-1622088891722-c6f91b80627f?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 5,
      name: 'Airtight Canister',
      category: 'Accessories / Storage',
      price: 75.0,
      image:
        'https://images.unsplash.com/photo-1695510082839-6ee46279c4e8?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 6,
      name: 'Digital Scale',
      category: 'Accessories / Measurement',
      price: 125.0,
      image:
        'https://images.unsplash.com/photo-1753091122032-ddfb454849cc?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const filters = ['All', 'Brewing', 'Grinders', 'Accessories'];

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category.includes(activeFilter));

  const openQuantityModal = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantityModal(product);
    setModalQuantity(1);
  };

  const closeModal = () => {
    setQuantityModal(null);
    setModalQuantity(1);
  };

  const handleAddToCart = () => {
    const items = Array(modalQuantity)
      .fill(null)
      .map((_, i) => ({
        name: quantityModal.name,
        finish: quantityModal.category,
        price: quantityModal.price,
        image: quantityModal.image,
        id: Date.now() + i,
      }));

    onAddToCart(items);
    closeModal();
  };

  const incrementQty = () => {
    if (modalQuantity < 10) setModalQuantity(modalQuantity + 1);
  };

  const decrementQty = () => {
    if (modalQuantity > 1) setModalQuantity(modalQuantity - 1);
  };

  return (
    <main>
      <section className="collection-hero">
        <h1>The Collection</h1>
        <p>
          Each piece is designed to elevate the ritual of brewing.
          Precision-engineered tools for those who take coffee seriously.
        </p>
      </section>

      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => {
          const ProductWrapper = product.link ? Link : 'a';
          const linkProps = product.link ? { to: product.link } : { href: '#' };

          return (
            <ProductWrapper
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              {...linkProps}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button
                  className="quick-add-btn"
                  onClick={(e) => openQuantityModal(e, product)}
                >
                  Add to Cart
                </button>
              </div>
              <span className="product-category">{product.category}</span>
              <h2 className="product-name">{product.name}</h2>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </ProductWrapper>
          );
        })}
      </div>

      {/* Quantity Modal */}
      {quantityModal && (
        <div className="quantity-modal-overlay" onClick={closeModal}>
          <div className="quantity-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-product-info">
              <div
                className="modal-product-image"
                style={{ backgroundImage: `url(${quantityModal.image})` }}
              ></div>
              <div className="modal-product-details">
                <span className="modal-product-category">
                  {quantityModal.category}
                </span>
                <h3 className="modal-product-name">{quantityModal.name}</h3>
                <span className="modal-product-price">
                  ${quantityModal.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="modal-quantity-section">
              <label className="modal-label">Quantity</label>
              <div className="modal-quantity-controls">
                <button
                  className="modal-qty-btn"
                  onClick={decrementQty}
                  disabled={modalQuantity <= 1}
                >
                  <span>−</span>
                </button>
                <div className="modal-qty-display">{modalQuantity}</div>
                <button
                  className="modal-qty-btn"
                  onClick={incrementQty}
                  disabled={modalQuantity >= 10}
                >
                  <span>+</span>
                </button>
              </div>
            </div>

            <button className="modal-add-btn" onClick={handleAddToCart}>
              Add to Cart • ${(quantityModal.price * modalQuantity).toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
