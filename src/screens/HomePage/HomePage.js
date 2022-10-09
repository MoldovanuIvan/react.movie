import React from "react";
import styles from './styles.module.scss'
import MainCarousel from "./components/MainCarousel";
import ProposedMovies from "./components/ProposedMovies";

const HomePage = () => {

    return <div>
        <MainCarousel/>
        <ProposedMovies/>
    </div>
}

export default HomePage