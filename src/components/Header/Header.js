import React from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/logoMain.svg'
import SText from "../SText";

const Header = () => {

    return <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={logo}/>
                <SText size={30} weight={900}>{'FilmChick'}</SText>
            </div>
            <div className={styles.nav}>
                <SText size={20} weight={500}>{'Home'}</SText>
                <SText size={20} weight={500}>{'Movie'}</SText>
                <SText size={20} weight={500}>{'Series'}</SText>
            </div>
    </div>
}

export default Header