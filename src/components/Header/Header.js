import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/logoMain.svg'
import SText from "../SText";
import {NavLink} from "react-router-dom";

const Header = () => {

    return <div className={styles.wrapper}>
        <NavLink to={'/'}>
            <div className={styles.logo}>
                <img src={logo}/>
                <SText size={30} weight={900}>{'FilmChick'}</SText>
            </div>
        </NavLink>
        <div className={styles.nav}>
            <SText size={20} weight={500}>{'Home'}</SText>
            <SText size={20} weight={500}>{'Movie'}</SText>
            <SText size={20} weight={500}>{'Series'}</SText>
        </div>
    </div>
}

export default Header