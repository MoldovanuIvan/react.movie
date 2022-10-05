import React from "react"
import Header from "./components/Header/Header";
import HomePage from "./screens/HomePage/HomePage";
import {Provider} from "react-redux";
import store from './redux/store'
import {
    BrowserRouter,
    Routes, Route,
} from "react-router-dom";
import FilmPage from "./screens/FilmPage/FilmPage";

const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Routes>
                        <Route path={'/*'} element={<HomePage/>}/>
                        <Route path={'/movie/:id'} element={<FilmPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
