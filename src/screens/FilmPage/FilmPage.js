import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearMovieInfo,
    getMovieCast,
    getMovieInfo,
    getMovieSimilar,
    getMovieTrailers
} from "../../redux/reducers/movieSlice";
import SText from "../../components/SText";
import ReactPlayer from "react-player";
import {Swiper, SwiperSlide} from "swiper/react";
import FilmCard from "../../components/FilmCard/FilmCard";

const FilmPage = () => {
    const {id, type} = useParams()
    const dispatch = useDispatch()
    const movieInfo = useSelector(state => state.movie)

    useEffect(() => {
        dispatch(getMovieInfo({id, type}))
        dispatch(getMovieCast({id, type}))
        dispatch(getMovieSimilar({id, type}))
        dispatch(getMovieTrailers({id, type}))
    }, [id])

    useEffect(() => {
        return () => dispatch(clearMovieInfo())
    }, [])

    return <div>
        <div
            style={{background: `url(${'https://image.tmdb.org/t/p/w1280' + movieInfo.backdrop}) center / cover no-repeat`}}
            className={styles.headerBG}/>
        <div className={styles.infoWrapper}>
            <div className={styles.poster}><img src={'https://image.tmdb.org/t/p/w1280' + movieInfo.poster}/></div>
            <div className={styles.info}>
                <div className={styles.title}><SText size={50} weight={700} lineHeight={50}>{movieInfo.title}</SText>
                </div>
                <div className={styles.genres}>
                    {movieInfo.genres.slice(0, 5).map(item => <div className={styles.genre}><SText size={12}
                                                                                                   weight={500}>{item.name}</SText>
                    </div>)}
                </div>
                <div className={styles.overview}>
                    <SText size={16} weight={500}>{movieInfo.overview}</SText>
                </div>
                <div>
                    <div className={styles.castsTitle}><SText size={22} weight={700}>{'Casts'}</SText></div>
                    <div className={styles.casts}>{movieInfo.cast.slice(0, 5).map(item => <div
                        className={styles.person}>
                        <div className={styles.personImage}><img
                            src={'https://image.tmdb.org/t/p/w500' + item.profile_path}/></div>
                        <div><SText size={12} weight={400}>{item.name}</SText></div>
                    </div>)}</div>
                </div>
            </div>
        </div>
        <div className={styles.trailers}>
            {
                movieInfo.trailers.slice(0, 4).map(item => <div>
                    <div className={styles.trailerTitle}><SText size={20} lineHeight={20}
                                                                weight={600}>{item.name}</SText></div>
                    <div className={styles.trailer}><ReactPlayer url={'https://www.youtube.com/embed/' + item.key}
                                                                 controls playing={false}/></div>
                </div>)
            }
        </div>
        <div className={styles.similar}>
            <div className={styles.trailerTitle}><SText size={20} lineHeight={20} weight={600}>{'Similar'}</SText></div>
            <Swiper
                slidesPerView={6.5}
                spaceBetween={8}
            >
                {
                    movieInfo.similar.map(item => <SwiperSlide>
                        <FilmCard type={type} id={item.id} title={item.title} poster={item.poster_path} rating={item.vote_average}/>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    </div>
}

export default FilmPage