import { useEffect, useState } from 'react';
import './CartDrawer.css';
import { CheckoutModal } from './CheckoutModal';
import { SuccessModal } from './SuccessModal';

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cart-active');
    } else {
      document.body.classList.remove('cart-active');
    }
  }, [isOpen]);

  // Group items by name + finish for display
  const groupedItems = items.reduce((acc, item) => {
    const key = `${item.name}-${item.finish}`;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 0 };
    }
    acc[key].quantity++;
    return acc;
  }, {});

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <span className="logo">Cart</span>
          <div className="header-actions">
            {items.length > 0 && (
              <button
                className="clear-cart-btn"
                onClick={onClearCart}
                aria-label="Clear cart"
              >
                Clear All
              </button>
            )}
            <span className="close-cart" onClick={onClose}>
              &times;
            </span>
          </div>
        </div>
        <div className="cart-items" id="cart-items-list">
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Your collection is empty.
            </p>
          ) : (
            Object.entries(groupedItems).map(([groupKey, item], index) => (
              <div className="cart-item" key={index}>
                <button
                  className="remove-item-btn"
                  onClick={() => onRemoveItem(groupKey)}
                  aria-label="Remove item"
                >
                  ×
                </button>
                <div
                  className="item-thumb"
                  style={{
                    background: `url('${item.image}') center/cover`,
                  }}
                ></div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.finish}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.quantity > 1 ? `${item.quantity} × ` : ''}$
                    {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total-row">
            <span>Subtotal</span>
            <span id="cart-total">${total.toFixed(2)}</span>
          </div>
          <button
            className="btn-primary"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setIsSuccessOpen(true);
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false);
          onClose(); // Close cart drawer
          onClearCart(); // Clear the cart
        }}
      />
    </>
  );
};
