import React, {useEffect, useState} from 'react'
import styles from "../ViewMoreMovies/ViewMoreMovies.module.scss";
import SText from "../../components/SText";
import FilmCard from "../../components/FilmCard/FilmCard";
import {useNavigate, useParams} from "react-router-dom";
import useSearch from "../../components/data/SearchContext";

const Search = () => {
    const {type, keyWords} = useParams()
    const {query, setQuery, setType, results, clearResults, doSearch} = useSearch()
    const navigate = useNavigate()

    useEffect(() => {
        setQuery(keyWords)
        doSearch()
    }, [keyWords])

    useEffect(() => {
        setType(type)
    }, [type])

    useEffect(() => {
        return () => {
            clearResults()
            setQuery('')
        }
    }, [])

    return <div className={styles.wrapper}>
        <div className={styles.title}><SText size={40}
                                             weight={500}>{type === 'movie' ? `Search: ${keyWords}` : `Search: ${keyWords}`}</SText>
        </div>
        <div className={styles.searchBlock}>
            <input value={query} onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    navigate('/' + type + '/!' + query)
                }
            }} onChange={(e) => setQuery(e.target.value)} type="text" placeholder={'Enter keyword'}/>
            <div onClick={() => navigate('/' + type + '/!' + query)} className={styles.searchBtn}>
                <SText>{'Search'}</SText></div>
        </div>
        <div className={styles.cardsGrid}>
            {
                results.length ? results.map(item => <FilmCard type={'movie'} id={item.id}
                                                               title={item.title || item.name}
                                                               poster={item.poster_path} rating={item.vote_average}/>)
                    : null
            }
        </div>
    </div>
}

export default Search