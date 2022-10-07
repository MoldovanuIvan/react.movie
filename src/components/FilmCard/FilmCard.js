import React from "react";
import styles from './FilmCard.module.scss'
import youtube from '../../assets/images/youtube.svg'
import {NavLink} from "react-router-dom";

const FilmCard = ({title, poster, id}) => {

    return <NavLink to={'/movie/' + id} onClick={()=>window.scrollTo({top:0, left:0, behavior: 'smooth'})}>
        <div className={styles.wrapper}>
            <div className={styles.poster}>
                <img src={'https://image.tmdb.org/t/p/w1280' + poster}/>
                <img className={styles.youtubeBtn} src={youtube}/>
            </div>
            <div className={styles.title}>{title}></div>
        </div>
    </NavLink>
}

export default FilmCard