import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Collection.css';

export const Collection = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState('All');

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

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const item = {
      name: product.name,
      finish: 'Matte Black',
      price: product.price,
      image: product.image,
      id: Date.now() + Math.random(),
    };

    onAddToCart([item]);
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
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="product-image">
              {product.link ? (
                <Link to={product.link}>
                  <img src={product.image} alt={product.name} />
                </Link>
              ) : (
                <img src={product.image} alt={product.name} />
              )}
              <button
                className="quick-add-btn"
                onClick={(e) => handleQuickAdd(e, product)}
              >
                Add to Cart
              </button>
            </div>
            <div className="product-info">
              {product.link ? (
                <Link
                  to={product.link}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className="product-category">{product.category}</span>
                  <h2 className="product-name">{product.name}</h2>
                </Link>
              ) : (
                <>
                  <span className="product-category">{product.category}</span>
                  <h2 className="product-name">{product.name}</h2>
                </>
              )}
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
