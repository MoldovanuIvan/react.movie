import React, {useEffect, useState} from 'react'
import styles from '../styles.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade';

import {Autoplay, EffectCoverflow} from "swiper";
import SText from "../../../components/SText";
import {useDispatch, useSelector} from "react-redux";
import {getSlides} from "../../../redux/reducers/sliderSlice";

const MainCarousel = () => {

    const dispatch = useDispatch()
    const movies = useSelector(state => state.slides.movies)

    useEffect(() => {
        dispatch(getSlides())
    }, [])

    if (!movies?.length) return null

    return <div>
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            modules={[Autoplay, EffectCoverflow]}
            className={styles.sliderWrapper}
            autoplay={{delay: 2000}}
            speed={2000}
            loop
            effect={'coverflow'}
        >
            {movies.map(item => <SwiperSlide className={styles.slide} key={item.id}>
                <img src={'https://image.tmdb.org/t/p/w1280' + item.backdrop_path}/>
                <div className={styles.info}>
                    <div>
                        <div className={styles.title}><SText size={70} weight={900} color={'#fffcfc'}
                                                             lineHeight={70}>{item.title}</SText></div>
                        <div className={styles.description}><SText size={15} weight={500} color={'#fffcfc'}
                                                                   lineHeight={20}>{item.overview}</SText></div>
                        <div className={styles.buttons}>
                            <div className={styles.watchNowBtn}>
                                <SText size={20} weight={500} lineHeight={20} color={'#fffcfc'}>{'Watch now'}</SText>
                            </div>
                            <div className={styles.watchTrailerBtn}>
                                <SText size={20} weight={500} lineHeight={20}
                                       color={'#fffcfc'}>{'Watch trailer'}</SText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.poster}>
                        <img src={'https://image.tmdb.org/t/p/w1280' + item.poster_path}/>
                    </div>
                </div>
            </SwiperSlide>)}
        </Swiper>
    </div>
}

export default MainCarousel