import React, { useEffect, useState } from 'react';
import './WelcomeAnimation.scss';

export const WelcomeAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="welcome-animation">
      <div className="welcome-animation__content">
        <div className="welcome-animation__logo-container">
          <img
            src="/img/logos/Logo-dark.svg"
            alt="Nice Gadgets Logo"
            className="welcome-animation__logo-image"
          />
        </div>
        <div className="welcome-animation__subtitle">
          Galera Team Presents
        </div>
      </div>
    </div>
  );
}; 