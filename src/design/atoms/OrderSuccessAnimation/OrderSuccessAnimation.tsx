import { useState, useEffect } from 'react';
import './OrderSuccessAnimation.scss';

const OrderSuccessAnimation = () => {
  const [showCheck, setShowCheck] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheck(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="order-success-overlay">
      <div className="order-success">
        <div className="order-success__icon-container">
          <div className={`order-success__icon ${showCheck ? 'order-success__icon--animate' : ''}`}>
            {showCheck && (
              <svg className="order-success__check" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </div>
        <h2 className="order-success__title">Order Confirmed!</h2>
        <p className="order-success__message">Thank you for your purchase. Your order has been successfully placed.</p>
        <div className="order-success__divider"></div>
        <p className="order-success__note">You will receive a confirmation email shortly.</p>
      </div>
    </div>
  );
};

export default OrderSuccessAnimation;