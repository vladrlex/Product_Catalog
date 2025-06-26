import { useState, useEffect } from 'react';
import './Cart.scss';
import { CartItem } from '../../design/organisms/CartItem/CartItem';
import { H1 } from '../../design/atoms/Typography/H1/H1';
import { useAppSelector } from '../../store/hooks';
import { ButtonBack } from '../../design/atoms/ButtonBack/ButtonBack';
import { CheckoutForm } from '../../design/organisms/CheckoutForm/CheckoutForm';

export const Cart = () => {
  const cartProducts = useAppSelector(state => state.cartProducts);
  const [itemQuantities, setItemQuantities] = useState<
    Record<string, { quantity: number; price: number }>
  >({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleQuantityChange = (
    id: string,
    quantity: number,
    price: number,
  ) => {
    setItemQuantities(prev => ({
      ...prev,
      [id]: { quantity, price },
    }));
  };

  useEffect(() => {
    let newTotalPrice = 0;
    let newTotalItems = 0;

    Object.values(itemQuantities).forEach(({ quantity, price }) => {
      newTotalPrice += quantity * price;
      newTotalItems += quantity;
    });

    setTotalPrice(newTotalPrice);
    setTotalItems(newTotalItems);
  }, [itemQuantities]);

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleCloseCheckoutForm = () => {
    setShowCheckoutForm(false);
  };

  if (showCheckoutForm) {
    return (
      <CheckoutForm
        onClose={handleCloseCheckoutForm}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />
    );
  }

  return (
    <section className="cart">
      <ButtonBack />

      <H1 className="cart__title">Cart</H1>

      {cartProducts.length > 0 ? (
        <>
        <div className='cart__items-container'>
          {cartProducts.map(product => (
            <CartItem
              key={product.itemId}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          <div className="cart__checkout-container">
            <div className="cart__total">
              <span className="cart__total-price">
                $
                {totalPrice % 1 === 0
                  ? totalPrice.toFixed(0)
                  : totalPrice.toFixed(2)}
              </span>

              <span className="cart__total-description">
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="hr-line-checkout" />

            <button
              className="cart__checkout-button"
              type="button"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>

        </div>

          
        </>
      ) : (
        <div className="cart__empty">
         <img 
            src="/img/wired-gradient-139-basket-hover-oscillate-empty.gif" 
            alt="Empty cart" 
            className="cart__empty-animation" 
            width="400"
          />
          <H1 className="cart__empty-message">Cart is empty</H1>
         </div>
      )}

      {showCheckoutForm && (
        <CheckoutForm
          onClose={handleCloseCheckoutForm}
          totalPrice={totalPrice}
          totalItems={totalItems}
        />
      )}
    </section>
  );
};
