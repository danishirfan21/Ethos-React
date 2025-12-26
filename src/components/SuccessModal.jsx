import './SuccessModal.css';

export const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1" />
            <circle cx="32" cy="32" r="28" fill="#10B981" fillOpacity="0.2" />
            <path
              d="M20 32L28 40L44 24"
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2>Payment Successful!</h2>
        <p>Your order has been confirmed and will be shipped soon.</p>

        <div className="success-details">
          <div className="detail-item">
            <span className="detail-label">Order number</span>
            <span className="detail-value">
              #ETH-{Math.floor(Math.random() * 10000)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estimated delivery</span>
            <span className="detail-value">3-5 business days</span>
          </div>
        </div>

        <button className="success-button" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
