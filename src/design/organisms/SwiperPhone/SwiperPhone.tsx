import React, { ReactNode, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

import './SwiperPhone.scss';
import { H2 } from '../../atoms/Typography/H2/H2';
import { SkeletonCards } from '../SkeletonCards/SkeletonCards';

type SwiperPhoneProps = {
  children?: ReactNode;
  title?: string;
  isLoading?: boolean;
  skeletonCount?: number;
};

export const SwiperPhone: React.FC<SwiperPhoneProps> = ({
  children,
  isLoading = false,
  skeletonCount = 4,
  title = 'Brand new models',
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="product-carousel">
      <div className="product-carousel__container">
        <div className="product-carousel__header">
          <H2 className="product-carousel__title">{title}</H2>
          <div className="product-carousel__nav">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="product-carousel__button product-carousel__button--prev"
              aria-label="Previous slide"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.47 3.53a.75.75 0 0 1 0 1.06L7.06 8l3.41 3.41a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0z"
                  className="nav-arrow-icon-phones"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="product-carousel__button product-carousel__button--next"
              aria-label="Next slide"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.53 3.53a.75.75 0 0 0 0 1.06L8.94 8l-3.41 3.41a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4a.75.75 0 0 0-1.06 0z"
                  className="nav-arrow-icon-phones"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="product-carousel__swiper-wrapper">
          <Swiper
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={16}
            grabCursor={true}
            modules={[Pagination]}
            className="product-carousel__swiper"
            cssMode={false}
            loop={false}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            watchOverflow={true}
            breakpoints={{
              320: {
                slidesPerView: 1.4,
                spaceBetween: 16,
              },
              576: {
                slidesPerView: 2.1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.8,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {isLoading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <SwiperSlide
                  key={`skeleton-${i}`}
                  className="product-carousel__slide"
                >
                  <SkeletonCards quantity={1} />
                </SwiperSlide>
              ))
            ) : children ? (
              Array.isArray(children) ? (
                React.Children.map(children, (child, index) => (
                  <SwiperSlide key={index} className="product-carousel__slide">
                    {child}
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="product-carousel__slide">
                  {children}
                </SwiperSlide>
              )
            ) : (
              Array.from({ length: 8 }, (_, i) => (
                <SwiperSlide key={i} className="product-carousel__slide">
                  Slide {i + 1}
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
