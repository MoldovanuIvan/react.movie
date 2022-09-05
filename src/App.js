import React, {useEffect, useState} from "react"
import ReactPlayer from 'react-player'

const App = () => {

    const [film, setFilm] = useState(false)

    useEffect(()=>{
        fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/2360/videos', {
            method: 'GET',
            headers: {
                'X-API-KEY': '5a2d814a-3b78-4575-bca1-b4d049dcc2c6',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setFilm(json)
            })
            .catch(err => console.log(err))
    },[])

    if (!film) return null

    return (
        <div className="App">
{/*            <ReactPlayer playing={true} url={film.items[2].url}/>*/}
            <iframe is="x-frame-bypass" src="https://widgets.kinopoisk.ru/discovery/trailer/167560?onlyPlayer=1&autoplay=1&cover=1" width="500" height="500"></iframe>
        </div>
    );
}

export default App;
