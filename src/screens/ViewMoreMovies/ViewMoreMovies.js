import React, {useEffect, useState} from "react";
import styles from './ViewMoreMovies.module.scss'
import SText from "../../components/SText";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {clearProposal, getProposal} from "../../redux/reducers/proposalSlice";
import FilmCard from "../../components/FilmCard/FilmCard";
import useSearch from "../../components/data/SearchContext";

const ViewMoreMovies = () => {
    const dispatch = useDispatch()
    const {type} = useParams()
    const data = useSelector(state => state.proposal)
    const [page, setPage] = useState(1)
    const {query, setQuery, setType, results, setEnterPressed, clearResults} = useSearch()

    useEffect(() => {
        if (type === 'movie')
            dispatch(getProposal({movieType: 'movie', filterType: 'popular', page}))
        else if (type === 'tv')
            dispatch(getProposal({movieType: 'tv', filterType: 'popular', page}))
    }, [page, type])

    useEffect(() => {
        setType(type)
    }, [type])

    useEffect(()=>{
        clearResults()
    }, [type])

    useEffect(() => {
        return () => clearResults()
    }, [])

    useEffect(() => {
        return () => dispatch(clearProposal())
    }, [])

    return <div className={styles.wrapper}>
        <div className={styles.title}><SText size={40} weight={500}>{type === 'movie' ? 'Movies' : 'TV Series'}</SText>
        </div>
        <div className={styles.searchBlock}>
            <input value={query} onKeyPress={(e) => {
                if (e.key === 'Enter')
                    setEnterPressed(true)
            }} onChange={(e) => setQuery(e.target.value)} type="text" placeholder={'Enter keyword'}/>
            <div className={styles.searchBtn}><SText>{'Search'}</SText></div>
        </div>
        <div className={styles.cardsGrid}>
            {
                results.length ? results.map(item => <FilmCard type={'movie'} id={item.id} title={item.title || item.name}
                                                        poster={item.poster_path} rating={item.vote_average}/>) :
                    type === 'movie' ?
                        data.popularMovies.map(item => <FilmCard type={'movie'} id={item.id} title={item.title}
                                                                 poster={item.poster_path}
                                                                 rating={item.vote_average}/>) :
                        data.popularTV.map(item => <FilmCard type={'tv'} id={item.id} title={item.name}
                                                             poster={item.poster_path} rating={item.vote_average}/>)
            }
        </div>
        <div className={styles.loadMore}>
            <div onClick={() => setPage(prev => prev + 1)} className={styles.loadBtn}>
                {'Load more'}
            </div>
        </div>
    </div>
}

export default ViewMoreMovies