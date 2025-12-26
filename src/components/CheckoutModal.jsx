import { useState } from 'react';
import './CheckoutModal.css';

export const CheckoutModal = ({ isOpen, onClose, total, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    country: 'US',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date MM/YY
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/[^0-9]/gi, '').slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    const cardNum = formData.cardNumber.replace(/\s/g, '');
    if (!cardNum || cardNum.length < 15) {
      newErrors.cardNumber = 'Card number is incomplete';
    }

    if (!formData.expiry || formData.expiry.length < 5) {
      newErrors.expiry = 'Expiry date is incomplete';
    }

    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'Security code is incomplete';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Enter cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onSuccess();
    
    // Reset form
    setFormData({
      email: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
      name: '',
      country: 'US',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Complete your order</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Card Information */}
          <div className="form-group">
            <label htmlFor="cardNumber">Card information</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 1234 1234 1234"
              maxLength="19"
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}

            <div className="card-details">
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                className={errors.expiry ? 'error' : ''}
              />
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
                maxLength="4"
                className={errors.cvc ? 'error' : ''}
              />
            </div>
            {errors.expiry && <span className="error-text">{errors.expiry}</span>}
            {errors.cvc && <span className="error-text">{errors.cvc}</span>}
          </div>

          {/* Cardholder Name */}
          <div className="form-group">
            <label htmlFor="name">Cardholder name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name on card"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country or region</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="IN">India</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="pay-button"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="processing">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>

          <p className="secure-notice">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <path d="M6 0C4.9 0 4 0.9 4 2V4H2C0.9 4 0 4.9 0 6V12C0 13.1 0.9 14 2 14H10C11.1 14 12 13.1 12 12V6C12 4.9 11.1 4 10 4H8V2C8 0.9 7.1 0 6 0ZM6 1.5C6.3 1.5 6.5 1.7 6.5 2V4H5.5V2C5.5 1.7 5.7 1.5 6 1.5Z"/>
            </svg>
            Payments are secure and encrypted
          </p>
        </form>

        <div className="powered-by">
          <span>Powered by</span>
          <svg width="33" height="14" viewBox="0 0 33 14" fill="#635BFF">
            <path d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843l2.268-.488zM15.772 3.94h2.268v7.905h-2.268V3.94zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.108-.85.343-1.409.343-.55 0-.805-.262-.805-.795l.009-3.352h2.205V3.94H8.532l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.923 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};