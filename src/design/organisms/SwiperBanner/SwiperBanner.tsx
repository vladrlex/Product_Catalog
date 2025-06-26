import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import './SwiperBanner.scss';

const SwiperBanner: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const bannerItems: { image: string; path?: string; isGif?: boolean }[] = [
    { image: 'J51', isGif: true },
    { image: 'banner-phones', path: '/phones' },
    { image: 'banner-tablets', path: '/tablets' },
    { image: 'banner-accessories', path: '/accessories' },
  ];

  return (
    <div className="banner-outer-container">
      <div className="slider-container">
        <button
          className="custom-nav-button prev-button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 0.75L1.25 5L5.5 9.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='nav-arrow-icon'
            />
          </svg>
        </button>

        <div className="swiper-container">
          <Swiper
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            pagination={{
              el: '.custom-pagination',
              clickable: true,
              renderBullet: (_: number, className: string) =>
                `<span class="${className}"></span>`,
            }}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            speed={1500}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
            simulateTouch={false}
            observer={true}
            observeParents={true}
          >
            {bannerItems.map((item, index) => (
              <SwiperSlide key={index}>
                {item.path ? (
                  <Link to={item.path} className="swiper-image-wrapper">
                    <img
                      src={`/img/${item.image}${item.isGif ? '.gif' : '.png'}`}
                      alt={`Slide ${index + 1}`}
                      className="slide-image"
                    />
                  </Link>
                ) : (
                  <div className="swiper-image-wrapper">
                    <img
                      src={`/img/${item.image}${item.isGif ? '.gif' : '.png'}`}
                      alt={`Slide ${index + 1}`}
                      className="slide-image"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className="custom-nav-button next-button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.75L4.75 5L0.5 9.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='nav-arrow-icon'
            />
          </svg>
        </button>
      </div>

      <div className="custom-pagination"></div>
    </div>
  );
};

export default SwiperBanner;
