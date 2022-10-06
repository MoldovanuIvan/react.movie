import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMovieCast, getMovieInfo, getMovieSimilar} from "../../redux/reducers/movieSlice";
import SText from "../../components/SText";

const FilmPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const movieInfo = useSelector(state => state.movie)
    console.log(movieInfo)
    useEffect(() => {
        dispatch(getMovieInfo(id))
        dispatch(getMovieCast(id))
        dispatch(getMovieSimilar(id))
    }, [id])

    return <div>
        <div
            style={{background: `url(${'https://image.tmdb.org/t/p/w1280' + movieInfo.backdrop}) center / cover no-repeat`}}
            className={styles.headerBG}/>
        <div className={styles.infoWrapper}>
            <div className={styles.poster}><img src={'https://image.tmdb.org/t/p/w1280' + movieInfo.poster}/></div>
            <div className={styles.info}>
                <div className={styles.title}><SText size={50} weight={700} lineHeight={50}>{movieInfo.title}</SText></div>
                <div className={styles.genres}>
                    {movieInfo.genres.slice(0,5).map(item => <div className={styles.genre}><SText size={12} weight={500}>{item.name}</SText></div>)}
                </div>
                <div className={styles.overview}>
                    <SText size={16} weight={500}>{movieInfo.overview}</SText>
                </div>
                <div>
                    <div className={styles.castsTitle}><SText size={22} weight={700}>{'Casts'}</SText></div>
                    <div className={styles.casts}>{movieInfo.cast.slice(0,5).map(item => <div className={styles.person}>
                        <div className={styles.personImage}><img src={'https://image.tmdb.org/t/p/w500' + item.profile_path}/></div>
                        <div><SText size={12} weight={400}>{item.name}</SText></div>
                    </div>)}</div>
                </div>
            </div>
        </div>
    </div>
}

export default FilmPage