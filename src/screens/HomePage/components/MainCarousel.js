import React from 'react'
import styles from '../styles.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/bundle'
import SwiperCore ,{Navigation, Autoplay} from "swiper";

const MainCarousel = () => {
    SwiperCore.use([Autoplay])
    return <div className={styles.sliderWrapper}>
        <Swiper
            className={styles.swiperWrapper}
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            simulateTouch={true}
            autoplay={{delay: 500}}
            navigation
            pagination={true}
            speed={300}
            loop
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide className={styles.slide}>Slide 1</SwiperSlide>
            <SwiperSlide className={styles.slide}>Slide 2</SwiperSlide>
            <SwiperSlide className={styles.slide}>Slide 3</SwiperSlide>
            <SwiperSlide className={styles.slide}>Slide 4</SwiperSlide>
            <SwiperSlide className={styles.slide}>Slide 5</SwiperSlide>
            <SwiperSlide className={styles.slide}>Slide 6</SwiperSlide>
        </Swiper>
    </div>
}

export default MainCarousel