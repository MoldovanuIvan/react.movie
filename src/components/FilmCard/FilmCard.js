import React from "react";
import styles from './FilmCard.module.scss'
import youtube from '../../assets/images/youtube.svg'
import {NavLink} from "react-router-dom";
import SText from "../SText";

const FilmCard = ({title, poster, id, rating, type}) => {

    return <NavLink to={`/${type}/` + id} onClick={()=>window.scrollTo({top:0, left:0, behavior: 'smooth'})}>
        <div className={styles.wrapper}>
            <div className={styles.poster}>
                <img src={'https://image.tmdb.org/t/p/w1280' + poster}/>
                <img className={styles.youtubeBtn} src={youtube}/>
                <div className={styles.filmRating}>
                    <SText>{rating.toFixed(1)}</SText>
                </div>
            </div>
            <div className={styles.title}>{title}</div>
        </div>
    </NavLink>
}

export default FilmCard