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
import {clearMovieTrailer, getSliderTrailer, getSlides} from "../../../redux/reducers/sliderSlice";
import {Box, Modal} from "@mui/material";
import closeModal from '../../../assets/images/closeModal.svg'
import ReactPlayer from "react-player";
import {NavLink} from "react-router-dom";

const MainCarousel = () => {

    const dispatch = useDispatch()
    const movies = useSelector(state => state.slides.movies)
    const [trailerModal, setTrailerModal] = useState(false)
    const [trailerId, setTrailerId] = useState(null)

    useEffect(() => {
        dispatch(getSlides())
    }, [])

    if (!movies?.length) return null

    return <div className={styles.carouselWrapper}>
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            modules={[Autoplay, EffectCoverflow]}
            className={styles.sliderWrapper}
            grabCursor={true}
            autoplay={{delay: 2000}}
            speed={2000}
            loop
            effect={'coverflow'}
        >
            {movies.map(item => <SwiperSlide className={styles.slide} key={item.id}>
                <img src={'https://image.tmdb.org/t/p/w1280' + item.backdrop_path}/>
                <div className={styles.info}>
                    <div style={{paddingBottom: 10}}>
                        <div className={styles.title}><SText size={70} weight={900} color={'#fffcfc'}
                                                             lineHeight={70}>{item.title}</SText></div>
                        <div className={styles.description}><SText size={15} weight={500} color={'#fffcfc'}
                                                                   lineHeight={20}>{item.overview}</SText></div>
                        <div className={styles.buttons}>
                            <NavLink to={`/movie/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                                <div className={styles.watchNowBtn}>
                                    <SText size={20} weight={500} lineHeight={20}
                                           color={'#fffcfc'}>{'Watch now'}</SText>
                                </div>
                            </NavLink>
                            <div onClick={() => {
                                setTrailerId(item.id)
                                setTrailerModal(true)
                            }} className={styles.watchTrailerBtn}>
                                {'Watch trailer'}
                            </div>
                        </div>
                    </div>
                    <div className={styles.poster}>
                        <img src={'https://image.tmdb.org/t/p/w1280' + item.poster_path}/>
                    </div>
                </div>
            </SwiperSlide>)}
        </Swiper>
        {trailerModal && <TrailerModal trailerId={trailerId} onClose={() => {
            setTrailerModal(false)
            dispatch(clearMovieTrailer())
        }}/>}
    </div>
}

const TrailerModal = ({onClose, trailerId}) => {
    const dispatch = useDispatch()
    const trailerKey = useSelector(state => state.slides.currentMovieTrailer)

    useEffect(() => {
        dispatch(getSliderTrailer(trailerId))
    }, [trailerId])

    return <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
        <Box className={styles.modal}>
            <img onClick={onClose} src={closeModal}/>
            <ReactPlayer playing={false} controls url={'https://www.youtube.com/embed/' + trailerKey}/>
        </Box>
    </Modal>
}

export default MainCarousel