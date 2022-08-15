import React, { /*useState,*/ useContext } from "react";
import { /*BrowserRouter, Link,*/ Routes, Route/*, Navigate*/ } from 'react-router-dom';
import { privateRoutes, publicRoutes } from "../router/routes";
import { AuthContext } from "../context";
//import Home from '../pages/Home'; not uses
//import About from '../pages/About'; not uses
//import Posts from '../pages/Posts'; not uses
//import Error from "../pages/Error.js"; not uses
//import PostIdPage from "../pages/PostIdPage" not uses
import Login from "../pages/Login";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Login />} />
            </Routes>
    );
};

//я уже в принципе говорил об использовании тернарных операторов а переписывать мне лень)

export default AppRouter