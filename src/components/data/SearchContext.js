import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, token} from "../../api";
import {useCoolDown} from "../utils/hooks";

const shape = {
    query: '',
    results: [],
    type: '',
    setQuery: () => {},
    setType: () => {},
    clearResults: () => {},
    doSearch: () => {},
}

export const SearchContext = createContext(shape)

export const useSearchContext = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [type, setType] = useState('')

    const doSearch = async () => {
        if (query !== '') {
            const response = await axios.get(BASE_URL + `search/${type}?api_key=` + token + '&query=' + query)
            setResults(response?.data?.results)
        }
        return []
    }

/*    const debouncedSearch = useCoolDown(async (value) => {
        await search(value);
    }, 300);

    async function handleChange(e) {
        debouncedSearch(e);
    }

    useEffect(() => {
        handleChange(query)
    }, [query])*/

    const clearResults = () => {
        setResults([])
        setQuery('')
    }

    return {
        query,
        setQuery,
        results,
        setType,
        doSearch,
        clearResults,
    }
}

const useSearch = () => {
    return useContext(SearchContext)
}

export default useSearch