import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Home.css';

export const Home = ({ onAddToCart }) => {
  const [selectedFinish, setSelectedFinish] = useState('Matte Black');
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState('idle');
  const [activeSection, setActiveSection] = useState('description');

  const philosophyRef = useIntersectionObserver({ threshold: 0.2 });

  const finishes = [
    { name: 'Matte Black', color: '#1a1a1a' },
    { name: 'Brushed Steel', color: '#d4d4d4' },
    { name: 'Copper', color: '#8c7851' },
  ];

  const incrementQty = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    setButtonState('loading');
    await new Promise((resolve) => setTimeout(resolve, 600));

    const items = Array(quantity)
      .fill(null)
      .map((_, i) => ({
        name: 'Apex Dripper v2',
        finish: selectedFinish,
        image: 'https://images.unsplash.com/photo-1565845103399-89ff0425d093?auto=format&fit=crop&q=80&w=800',
        price: 145.0,
        id: Date.now() + i,
      }));

    onAddToCart(items);
    setButtonState('success');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setButtonState('idle');
    setQuantity(1);
  };

  const toggleSection = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  return (
    <main>
      <div className="hero-grid">
        {/* LEFT COLUMN: Gallery */}
        <section className="gallery-scroll">
          <div className="img-container">
            <img
              src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=1200"
              alt="Apex 1"
            />
          </div>
          <div className="img-container">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200"
              alt="Apex 2"
            />
          </div>
          <div className="img-container">
            <img
              src="https://images.unsplash.com/photo-1517088455889-bfa75135412c?auto=format&fit=crop&q=80&w=1200"
              alt="Apex 3"
            />
          </div>
        </section>

        {/* RIGHT COLUMN: Product Details */}
        <section className="details-pane">
          <span className="breadcrumb">Brewing / Manual Pour Over</span>

          <div className="rating-summary">
            <div className="stars">★★★★★</div>
            <span
              className="review-count"
            >
              127 reviews
            </span>
          </div>

          <h1>
            The Apex <br />
            Dripper v2
          </h1>
          <span className="price">$145.00</span>

          <span className="selector-label">Select Finish</span>
          <div className="finish-grid">
            {finishes.map((finish) => (
              <button
                key={finish.name}
                className={`swatch-btn ${
                  selectedFinish === finish.name ? 'active' : ''
                }`}
                onClick={() => setSelectedFinish(finish.name)}
                aria-label={finish.name}
              >
                <div
                  className="inner-circle"
                  style={{ background: finish.color }}
                ></div>
              </button>
            ))}
          </div>

          <div className="quantity-selector">
            <span className="selector-label" style={{ marginBottom: 0 }}>
              Quantity
            </span>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={decrementQty}
                disabled={quantity <= 1}
              >
                <span>−</span>
              </button>
              <div className="qty-display">{quantity}</div>
              <button
                className="qty-btn"
                onClick={incrementQty}
                disabled={quantity >= 10}
              >
                <span>+</span>
              </button>
            </div>
          </div>

          <button
            className={`btn-primary ${buttonState}`}
            onClick={handleAddToCart}
            disabled={buttonState !== 'idle'}
          >
            <span className="btn-text">Add to Collection</span>
            <span className="btn-feedback">
              {buttonState === 'loading' && 'Adding...'}
              {buttonState === 'success' && (
                <>
                  <span className="checkmark"></span>Added to cart
                </>
              )}
            </span>
          </button>

          <div className="trust-badges">
            <div className="badge">
              <svg
                className="badge-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="badge-text">
                <span className="badge-title">Free Shipping</span>
                On orders over $100
              </div>
            </div>
            <div className="badge">
              <svg
                className="badge-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div className="badge-text">
                <span className="badge-title">60-Day Returns</span>
                Easy, no-questions-asked
              </div>
            </div>
            <div className="badge">
              <svg
                className="badge-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div className="badge-text">
                <span className="badge-title">Secure Payment</span>
                SSL encrypted checkout
              </div>
            </div>
            <div className="badge">
              <svg
                className="badge-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="badge-text">
                <span className="badge-title">2-Year Warranty</span>
                Craftsmanship guaranteed
              </div>
            </div>
          </div>

          <div
            className={`info-section ${
              activeSection === 'description' ? 'active' : ''
            }`}
          >
            <div
              className="info-header"
              onClick={() => toggleSection('description')}
            >
              <span className="selector-label">Description</span>
              <span className="expand-icon">
                {activeSection === 'description' ? '−' : '+'}
              </span>
            </div>
            <div className="info-content">
              <div className="info-inner">
                <p style={{ marginBottom: '1rem' }}>
                  The Apex v2 represents a pinnacle in fluid dynamics. Featuring
                  a unique 60-degree precision angle and deep vertical ridges,
                  it ensures optimal airflow and consistent extraction across
                  the entire coffee bed.
                </p>
                <p>
                  Designed for the discerning home barista, this dripper
                  balances form and function to elevate your daily ritual. Each
                  piece is inspected by hand to meet our exacting standards.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`info-section ${
              activeSection === 'materials' ? 'active' : ''
            }`}
          >
            <div
              className="info-header"
              onClick={() => toggleSection('materials')}
            >
              <span className="selector-label">Materials & Care</span>
              <span className="expand-icon">
                {activeSection === 'materials' ? '−' : '+'}
              </span>
            </div>
            <div className="info-content">
              <div className="info-inner">
                <ul>
                  <li>
                    Hand-blown Borosilicate Glass (thermal shock resistant)
                  </li>
                  <li>Aerospace Grade 6061 Aluminum Base</li>
                  <li>Heat resistant up to 200°C / 392°F</li>
                  <li>Dishwasher safe (top rack recommended)</li>
                  <li>Hand wash with mild soap for longevity</li>
                  <li>Avoid abrasive cleaners on aluminum finish</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`info-section ${
              activeSection === 'brewing' ? 'active' : ''
            }`}
          >
            <div
              className="info-header"
              onClick={() => toggleSection('brewing')}
            >
              <span className="selector-label">Brewing Guide</span>
              <span className="expand-icon">
                {activeSection === 'brewing' ? '−' : '+'}
              </span>
            </div>
            <div className="info-content">
              <div className="info-inner">
                <p style={{ marginBottom: '1rem' }}>
                  Recommended for 12-20g single serve brews:
                </p>
                <ul>
                  <li>Grind: Medium-fine (similar to table salt)</li>
                  <li>Water temp: 93-96°C / 200-205°F</li>
                  <li>Ratio: 1:16 coffee to water</li>
                  <li>Brew time: 2:30-3:00 minutes</li>
                  <li>Compatible with standard cone filters (size 02)</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`info-section ${
              activeSection === 'shipping' ? 'active' : ''
            }`}
          >
            <div
              className="info-header"
              onClick={() => toggleSection('shipping')}
            >
              <span className="selector-label">Shipping & Returns</span>
              <span className="expand-icon">
                {activeSection === 'shipping' ? '−' : '+'}
              </span>
            </div>
            <div className="info-content">
              <div className="info-inner">
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Shipping:</strong>
                </p>
                <ul style={{ marginBottom: '1.5rem' }}>
                  <li>Free standard shipping on orders over $100</li>
                  <li>Standard delivery: 4-7 business days</li>
                  <li>Express delivery: 2-3 business days (+$15)</li>
                  <li>Ships from Portland, Oregon</li>
                </ul>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Returns:</strong>
                </p>
                <ul>
                  <li>60-day return window from delivery</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Free return shipping within the US</li>
                  <li>Full refund processed within 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="review-highlight">
            "This dripper completely changed my morning routine. The clarity of
            flavor is unlike anything I've experienced with other pour-over
            methods. Worth every penny."
            <span className="reviewer-name">— Sarah M., Verified Purchase</span>
          </div>
        </section>
      </div>

      <section className="philosophy" ref={philosophyRef}>
        <h2>The Ethos Standard</h2>
        <p
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            color: 'var(--text-muted)',
          }}
        >
          We believe that the ritual of brewing is just as important as the
          coffee itself. Every curve and material choice in our gear is designed
          to disappear, leaving only the clarity of the cup.
        </p>
      </section>
    </main>
  );
};
