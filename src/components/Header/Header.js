import React, {useEffect, useState} from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/logoMain.svg'
import SText from "../SText";
import {NavLink, useLocation} from "react-router-dom";

const Header = () => {
    const [darkStyle, setDarkStyle] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setDarkStyle(true)
            } else setDarkStyle(false)
        })

        return () => document.removeEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setDarkStyle(true)
            } else setDarkStyle(false)
        })
    }, [])

    return <div style={{background: darkStyle ? '#0f0f0f' : 'initial'}} className={styles.wrapper}>
        <div style={{padding: darkStyle ? '15px 50px' : '25px 50px'}} className={styles.container}>
            <NavLink to={'/'}>
                <div className={styles.logo}>
                    <img src={logo}/>
                    <SText size={30} weight={900}>{'FilmChick'}</SText>
                </div>
            </NavLink>
            <div className={styles.nav}>
                <NavLink to={'/'} onClick={()=>window.scrollTo(0,0)}><SText style={{borderBottom: pathname === '/' ? '2px solid #ff0000' : 'none'}}
                                         size={20} weight={500}>{'Home'}</SText></NavLink>
                <NavLink to={'/movie'} onClick={()=>window.scrollTo(0,0)}><SText
                    style={{borderBottom: pathname === '/movie' ? '2px solid #ff0000' : 'none'}} size={20}
                    weight={500}>{'Movie'}</SText></NavLink>
                <NavLink to={'/tv'} onClick={()=>window.scrollTo(0,0)}><SText style={{borderBottom: pathname === '/tv' ? '2px solid #ff0000' : 'none'}}
                                           size={20} weight={500}>{'Series'}</SText></NavLink>
            </div>
        </div>
    </div>
}

export default Header