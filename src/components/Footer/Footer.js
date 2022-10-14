import React from "react";
import styles from './Footer.module.scss'
import logo from '../../assets/images/logoMain.svg'
import SText from "../SText";
import {NavLink, useLocation} from "react-router-dom";

const Footer = () => {
    const {pathname} = useLocation()

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>
                <NavLink to={'/'} onClick={() => window.scrollTo(0, 0)}><img src={logo}/></NavLink>
            </div>
            <div className={styles.nav}>
                <NavLink to={'/'} onClick={() => window.scrollTo(0, 0)}><SText style={{borderBottom: pathname === '/' ? '2px solid #ff0000' : 'none'}} size={18} weight={500}
                                                                               lineHeight={18}>{'Home'}</SText></NavLink>
                <NavLink to={'/movie'} onClick={() => window.scrollTo(0, 0)}><SText style={{borderBottom: pathname === '/movie' ? '2px solid #ff0000' : 'none'}} size={18} weight={500}
                                                                                    lineHeight={18}>{'Movie'}</SText></NavLink>
                <NavLink to={'/tv'} onClick={() => window.scrollTo(0, 0)}><SText style={{borderBottom: pathname === '/tv' ? '2px solid #ff0000' : 'none'}} size={18} weight={500}
                                                                                 lineHeight={18}>{'Series'}</SText></NavLink>
            </div>
            <div>
                <SText color={'#ffffff80'}>{'© 2022 FilmChick'}</SText>
            </div>
        </div>
    </div>
}

export default Footer