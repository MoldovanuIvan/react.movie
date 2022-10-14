import React, {useEffect} from "react";
import styles from '../styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getProposal} from "../../../redux/reducers/proposalSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import FilmCard from "../../../components/FilmCard/FilmCard";
import SText from "../../../components/SText";
import {NavLink} from "react-router-dom";

const ProposedMovies = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.proposal)

    useEffect(() => {
        dispatch(getProposal({movieType: 'movie', filterType: 'popular'}))
        dispatch(getProposal({movieType: 'movie', filterType: 'top_rated'}))
        dispatch(getProposal({movieType: 'tv', filterType: 'popular'}))
        dispatch(getProposal({movieType: 'tv', filterType: 'top_rated'}))
    }, [])

    const proposalCreator = (title, data, type) => {

        return <div className={styles.proposalLine}>
            <div className={styles.proposalTitle}>
                <SText size={20} lineHeight={20} weight={600}>{title}</SText>
                <NavLink to={'/' + type} onClick={() => window.scrollTo(0, 0)}>
                    <div className={styles.moreBtn}>{'View more'}</div>
                </NavLink>
            </div>
            <div className={styles.proposal}>
                <Swiper
                    slidesPerView={6.5}
                    spaceBetween={8}
                >
                    {
                        data.map(item => <SwiperSlide>
                            <FilmCard type={type} id={item.id} title={item.title || item.name} poster={item.poster_path}
                                      rating={item.vote_average}/>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    }

    return <div>
        {proposalCreator('Trending movies', data.popularMovies, 'movie')}
        {proposalCreator('Top rated movies', data.topRatedMovies, 'movie')}
        {proposalCreator('Trending TV', data.popularTV, 'tv')}
        {proposalCreator('Top rated TV', data.topRatedTV, 'tv')}
    </div>
}

export default ProposedMovies