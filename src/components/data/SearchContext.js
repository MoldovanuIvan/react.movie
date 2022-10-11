import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, token} from "../../api";


export function useCoolDown(callback = (...args) => {
}, timeout = 400) {

    const [timer, setTimer] = useState(0)

    return (...args) => {
        if (timer)
            clearTimeout(timer)

        const newTimer = setTimeout(() => {
            return callback(...args)
        }, timeout)

        setTimer(newTimer)
    }
}

const shape = {
    query: '',
    results: [],
    setQuery: (e) => {},
}

export const SearchContext = createContext(shape)

export const useSearchContext = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const search = async (value) => {
        if (query !== '') {
            const response = await axios.get(BASE_URL + 'search/movie?api_key=' + token + '&query=' + value)
            console.log(response?.data)
            setResults(response?.data?.results)
        }
        return []
    }

    const debouncedSearch = useCoolDown(async (value) => {
        await search(value);
    }, 300);

    async function handleChange(e) {
        debouncedSearch(e);
    }

    useEffect(() => {
        handleChange(query)
    }, [query])

    return {
        query,
        setQuery,
        results,
    }
}

const useSearch = () => {
    return useContext(SearchContext)
}

export default useSearch