import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import './CheckoutForm.scss';
import { H1 } from '../../atoms/Typography/H1/H1';
import { useAppDispatch } from '../../../store/hooks';
import * as CartAction from '../../../store/features/cartProducts';
import {
  fetchCities,
  fetchWarehouses,
} from '../../../services/api/novaposhtaApi';
import OrderSuccessAnimation from '../../atoms/OrderSuccessAnimation/OrderSuccessAnimation';

interface CheckoutFormProps {
  onClose: () => void;
  totalPrice: number;
  totalItems: number;
}

interface City {
  Ref: string;
  Description: string;
}

interface Warehouse {
  Ref: string;
  Description: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  warehouse: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  warehouse: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onClose,
  totalPrice,
  totalItems,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    warehouse: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    warehouse: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    warehouse: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const [showAnimation, setShowAnimation] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  const [selectedCityRef, setSelectedCityRef] = useState<string>('');

  const [warehouseSuggestions, setWarehouseSuggestions] = useState<Warehouse[]>([]);
  const [showWarehouseSuggestions, setShowWarehouseSuggestions] = useState<boolean>(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState<boolean>(false);
  const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (selectedCityRef) {
      fetchWarehouses(selectedCityRef)
        .then((warehouses) => {
          setWarehouseSuggestions(warehouses);
          setFilteredWarehouses([]);
        })
        .catch(error => console.error('Error fetching warehouses:', error));
    }
  }, [selectedCityRef]);

  const handleBlur = (field: keyof FormState) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof FormState, value: string): string => {
    let errorMessage = '';

    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          errorMessage = 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errorMessage = 'Last name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'city':
        if (!value.trim()) {
          errorMessage = 'City is required';
        }
        break;
      case 'warehouse':
        if (!value.trim() && selectedCityRef) {
          errorMessage = 'Branch office is required';
        }
        break;
      case 'cardNumber':
        if (paymentMethod === 'card') {
          if (!value.trim()) {
            errorMessage = 'Card number is required';
          } else if (value.replace(/\s/g, '').length !== 16) {
            errorMessage = 'Card number must be 16 digits';
          } else if (!validateCardNumber(value.replace(/\s/g, ''))) {
            errorMessage = 'Invalid card number';
          }
        }
        break;
      case 'expiryDate':
        if (paymentMethod === 'card') {
          if (!value.trim()) {
            errorMessage = 'Expiry date is required';
          } else if (value.length < 5) {
            errorMessage = 'Please enter a valid expiry date';
          } else {
            const month = parseInt(value.slice(0, 2));
            const year = parseInt('20' + value.slice(3));
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            if (month < 1 || month > 12) {
              errorMessage = 'Invalid month';
            } else if (
              year < currentYear ||
              (year === currentYear && month < currentMonth)
            ) {
              errorMessage = 'Card expired';
            }
          }
        }
        break;
      case 'cvv':
        if (paymentMethod === 'card') {
          if (!value.trim()) {
            errorMessage = 'CVV is required';
          } else if (value.length !== 3) {
            errorMessage = 'CVV must be 3 digits';
          }
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));

    return errorMessage;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      warehouse: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    };

    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof FormState;
      const error = validateField(fieldName, formData[fieldName]);
      newErrors[fieldName] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormState;

    setFormData({
      ...formData,
      [fieldName]: value,
    });

    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      city: value,
    });
    setShowCitySuggestions(true);

    if (value.length > 2) {
      fetchCities(value)
        .then(cities => {
          setCitySuggestions(cities);
        })
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setCitySuggestions([]);
    }

    if (touched.city) {
      validateField('city', value);
    }
  };

  const handleCitySelect = (city: City) => {
    setFormData({
      ...formData,
      city: city.Description,
      warehouse: '',
    });
    setSelectedCityRef(city.Ref);
    setShowCitySuggestions(false);
    setErrors({
      ...errors,
      city: '',
    });
  };

  const handleWarehouseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      warehouse: value,
    });
    setShowWarehouseSuggestions(true);

    if (value.length > 0 && warehouseSuggestions.length > 0) {
      const filtered = warehouseSuggestions.filter(w =>
        w.Description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredWarehouses(filtered);
    } else {
      setFilteredWarehouses([]);
    }

    if (touched.warehouse) {
      validateField('warehouse', value);
    }
  };

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setFormData({
      ...formData,
      warehouse: warehouse.Description,
    });
    setShowWarehouseSuggestions(false);
    setErrors({
      ...errors,
      warehouse: '',
    });
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value as 'cash' | 'card';
    setPaymentMethod(method);

    if (method !== 'card') {
      setErrors({
        ...errors,
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      });
    } else if (formSubmitted) {
      validateField('cardNumber', formData.cardNumber);
      validateField('expiryDate', formData.expiryDate);
      validateField('cvv', formData.cvv);
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length <= 16) {
      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');

      setFormData({
        ...formData,
        cardNumber: formatted,
      });

      if (touched.cardNumber) {
        validateField('cardNumber', formatted);
      }
    }
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length <= 4) {
      let formatted = value;

      if (value.length > 2) {
        formatted = value.slice(0, 2) + '/' + value.slice(2);
      }

      setFormData({
        ...formData,
        expiryDate: formatted,
      });

      if (touched.expiryDate) {
        validateField('expiryDate', formatted);
      }
    }
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length <= 3) {
      setFormData({
        ...formData,
        cvv: value,
      });

      if (touched.cvv) {
        validateField('cvv', value);
      }
    }
  };

  const validateCardNumber = (number: string): boolean => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      setShowAnimation(true);

      setTimeout(() => {
        dispatch(CartAction.removeAllFromCart());
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="checkout-overlay">
      <section className="checkout">
        <div className="checkout__header">
          <H1 className="checkout__title">Checkout</H1>
        </div>

        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <div className="checkout__section">
            <h2 className="checkout__section-title">Personal Information</h2>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="firstName">
                First Name
              </label>
              <input
                className={`checkout__input ${touched.firstName && errors.firstName ? 'checkout__input--error' : ''}`}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={() => handleBlur('firstName')}
                required
              />
              {touched.firstName && errors.firstName && (
                <div className="checkout__error-message">
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`checkout__input ${touched.lastName && errors.lastName ? 'checkout__input--error' : ''}`}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={() => handleBlur('lastName')}
                required
              />
              {touched.lastName && errors.lastName && (
                <div className="checkout__error-message">
                  {errors.lastName}
                </div>
              )}
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="email">
                Email
              </label>
              <input
                className={`checkout__input ${touched.email && errors.email ? 'checkout__input--error' : ''}`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                required
              />
              {touched.email && errors.email && (
                <div className="checkout__error-message">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Nova Poshta</h2>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="city">
                City
              </label>
              <div className="checkout__autocomplete">
                <input
                  className={`checkout__input ${touched.city && errors.city ? 'checkout__input--error' : ''}`}
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={handleCityChange}
                  onBlur={() => handleBlur('city')}
                  required
                />
                {touched.city && errors.city && (
                  <div className="checkout__error-message">
                    {errors.city}
                  </div>
                )}
                {showCitySuggestions && citySuggestions.length > 0 && (
                  <ul className="checkout__suggestions">
                    {citySuggestions.map(city => (
                      <li
                        key={city.Ref}
                        onClick={() => handleCitySelect(city)}
                        className="checkout__suggestion-item"
                      >
                        {city.Description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="checkout__field">
              <label className="checkout__label" htmlFor="warehouse">
                Branch Office
              </label>
              <div className="checkout__autocomplete">
                <input
                  className={`checkout__input ${touched.warehouse && errors.warehouse ? 'checkout__input--error' : ''}`}
                  type="text"
                  id="warehouse"
                  name="warehouse"
                  placeholder="Enter branch office"
                  value={formData.warehouse}
                  onChange={handleWarehouseChange}
                  onBlur={() => handleBlur('warehouse')}
                  required
                  disabled={!selectedCityRef}
                />
                {touched.warehouse && errors.warehouse && (
                  <div className="checkout__error-message">
                    {errors.warehouse}
                  </div>
                )}
                {showWarehouseSuggestions && filteredWarehouses.length > 0 && (
                  <ul className="checkout__suggestions">
                    {filteredWarehouses.map(warehouse => (
                      <li
                        key={warehouse.Ref}
                        onClick={() => handleWarehouseSelect(warehouse)}
                        className="checkout__suggestion-item"
                      >
                        {warehouse.Description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="checkout__section">
            <h2 className="checkout__section-title">Payment Method</h2>

            <div className="checkout__radio-group">
              <div className="checkout__radio">
                <input
                  className="checkout__radio-input"
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="checkout__radio-label" htmlFor="cash">
                  Cash on Delivery
                </label>
              </div>

              <div className="checkout__radio">
                <input
                  className="checkout__radio-input"
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="checkout__radio-label" htmlFor="card">
                  Credit/Debit Card
                </label>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="checkout__card-details">
                <div className="checkout__field">
                  <label className="checkout__label" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    className={`checkout__input ${touched.cardNumber && errors.cardNumber ? 'checkout__input--error' : ''}`}
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    onBlur={() => handleBlur('cardNumber')}
                    required={paymentMethod === 'card'}
                    maxLength={19}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <div className="checkout__error-message">
                      {errors.cardNumber}
                    </div>
                  )}
                </div>

                <div className="checkout__field">
                  <label className="checkout__label" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    className={`checkout__input ${touched.expiryDate && errors.expiryDate ? 'checkout__input--error' : ''}`}
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    onBlur={() => handleBlur('expiryDate')}
                    required={paymentMethod === 'card'}
                    maxLength={5}
                  />
                  {touched.expiryDate && errors.expiryDate && (
                    <div className="checkout__error-message">
                      {errors.expiryDate}
                    </div>
                  )}
                </div>

                <div className="checkout__field">
                  <label className="checkout__label" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className={`checkout__input ${touched.cvv && errors.cvv ? 'checkout__input--error' : ''}`}
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="XXX"
                    value={formData.cvv}
                    onChange={handleCvvChange}
                    onBlur={() => handleBlur('cvv')}
                    required={paymentMethod === 'card'}
                    maxLength={3}
                  />
                  {touched.cvv && errors.cvv && (
                    <div className="checkout__error-message">{errors.cvv}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="checkout__summary">
            <div className="checkout__total">
              <span className="checkout__total-price">
                $
                {totalPrice % 1 === 0
                  ? totalPrice.toFixed(0)
                  : totalPrice.toFixed(2)}
              </span>
              <span className="checkout__total-description">
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div className="checkout__hr-line"></div>

          <div className="checkout__actions">
            <button
              className="checkout__button checkout__button--back"
              type="button"
              onClick={onClose}
            >
              Back to Cart
            </button>
            <button
              className="checkout__button checkout__button--submit"
              type="submit"
            >
              Complete Order
            </button>
          </div>
        </form>
        {showAnimation && <OrderSuccessAnimation />}
      </section>
    </div>
  );
};
