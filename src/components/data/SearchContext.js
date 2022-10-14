import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, token} from "../../api";
import {useCoolDown} from "../utils/hooks";

const shape = {
    query: '',
    results: [],
    type: '',
    setQuery: (e) => {},
    setType: () => {},
    setEnterPressed: () => {},
    clearResults: () => {},
}

export const SearchContext = createContext(shape)

export const useSearchContext = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [type, setType] = useState('')
    const [enterPressed, setEnterPressed] = useState(false)

    const search = async (value) => {
        console.log(enterPressed)
        if (query !== '' && enterPressed) {
            const response = await axios.get(BASE_URL + `search/${type}?api_key=` + token + '&query=' + value)
            console.log(response)
            setResults(response?.data?.results)
            if (response?.status === 200)
                setEnterPressed(false)
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
    }, [enterPressed])

    const clearResults = () => {
        setResults([])
        setQuery('')
    }

    return {
        query,
        setQuery,
        results,
        setType,
        setEnterPressed,
        clearResults,
    }
}

const useSearch = () => {
    return useContext(SearchContext)
}

export default useSearch