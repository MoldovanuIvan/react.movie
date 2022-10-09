import React from "react";
import styles from './Footer.module.scss'
import logo from '../../assets/images/logoMain.svg'
import SText from "../SText";
import {NavLink} from "react-router-dom";

const Footer = () => {

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>
                <NavLink to={'/'} onClick={() => window.scrollTo(0, 0)}><img src={logo}/></NavLink>
            </div>
            <div className={styles.nav}>
                <SText size={18} weight={500} lineHeight={18}>{'Home'}</SText>
                <SText size={18} weight={500} lineHeight={18}>{'Movie'}</SText>
                <SText size={18} weight={500} lineHeight={18}>{'Series'}</SText>
            </div>
            <div>
                <SText color={'#ffffff80'}>{'© 2022 FilmChick'}</SText>
            </div>
        </div>
    </div>
}

export default Footer