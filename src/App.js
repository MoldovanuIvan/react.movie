import React from "react"
import Header from "./components/Header/Header";
import HomePage from "./screens/HomePage/HomePage";
import {Provider} from "react-redux";
import store from './redux/store'
import {
    BrowserRouter,
    Routes, Route, Navigate
} from "react-router-dom";
import FilmPage from "./screens/FilmPage/FilmPage";
import Footer from "./components/Footer/Footer";
import ViewMoreMovies from "./screens/ViewMoreMovies/ViewMoreMovies";
import {SearchContext, useSearchContext} from "./components/data/SearchContext";
import Search from "./screens/Search/Search";

const App = () => {
    const searchData = useSearchContext()

    return (
        <SearchContext.Provider value={searchData}>
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Routes>
                            <Route path={'/*'} element={<HomePage/>}/>

                            <Route path={'/react.movie/'} element={<Navigate to={'/'} replace/>}/>
                            <Route path={'/:type'} element={<ViewMoreMovies/>}/>
                            <Route path={'/:type/!:keyWords'} element={<Search/>}/>
                            <Route path={'/:type/:id'} element={<FilmPage/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </Provider>
        </SearchContext.Provider>
    );
}

export default App;
