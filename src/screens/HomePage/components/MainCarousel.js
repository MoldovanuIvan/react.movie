import React, {useEffect, useState} from 'react'
import styles from '../styles.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade';

import {Autoplay, EffectCoverflow} from "swiper";
import SText from "../../../components/SText";

const MainCarousel = () => {

    const [movies, setMovies] = useState(false)

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&page=1')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setMovies(json.results)
            })
            .catch(err => console.log(err))
    }, [])

    if (!movies) return null

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
                        <div className={styles.title}><SText size={70} weight={900} color={'#fff'}
                                                             lineHeight={30}>{item.title}</SText></div>
                        <div className={styles.description}>{item.overview}</div>
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