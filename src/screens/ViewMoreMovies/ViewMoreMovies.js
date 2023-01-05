import React, {useEffect, useState} from "react";
import styles from './ViewMoreMovies.module.scss'
import SText from "../../components/SText";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {clearProposal, getProposal} from "../../redux/reducers/proposalSlice";
import FilmCard from "../../components/FilmCard/FilmCard";
import useSearch from "../../components/data/SearchContext";

const ViewMoreMovies = () => {
    const dispatch = useDispatch()
    const {type} = useParams()
    const data = useSelector(state => state.proposal)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const {query, setQuery} = useSearch()

    useEffect(() => {
        dispatch(getProposal({movieType: type, filterType: 'popular', page}))
    }, [type, page])

    useEffect(() => {
        return () => {
            dispatch(clearProposal())
            setQuery('')
        }
    }, [])

    return <div className={styles.wrapper}>
        <div className={styles.title}><SText size={40} weight={500}>{type === 'movie' ? 'Movies' : 'TV Series'}</SText>
        </div>
        <div className={styles.searchBlock}>
            <input value={query} onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    navigate('/' + type + '/!' + query)
                }
            }} onChange={(e) => setQuery(e.target.value)} type="text" placeholder={'Enter keyword'}/>
            <div onClick={() => {
                navigate('/' + type + '/!' + query)
            }} className={styles.searchBtn}><SText>{'Search'}</SText></div>
        </div>
        <div className={styles.cardsGrid}>
            {
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