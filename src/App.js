import React, {useEffect, useState} from "react"
import ReactPlayer from 'react-player'
import Header from "./components/Header/Header";
import HomePage from "./screens/HomePage/HomePage";

const App = () => {

 /*   const [film, setFilm] = useState(false)

    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/movie/773867/videos?api_key=04c35731a5ee918f014970082a0088b1')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setFilm(json)
            })
            .catch(err => console.log(err))
    },[])

    if (!film) return null*/

    return (
        <div>
            <Header/>
          {/*  <ReactPlayer playing={true} url={'https://www.youtube.com/embed/' + film.results[1].key}/>*/}
            <HomePage/>

        </div>
    );
}

export default App;
