import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMovieCast, getMovieInfo, getMovieSimilar} from "../../redux/reducers/movieSlice";

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
        <div style={{background: `url(${'https://image.tmdb.org/t/p/w1280' + movieInfo.poster}) center / cover no-repeat`}} className={styles.headerBG}></div>
    </div>
}

export default FilmPage