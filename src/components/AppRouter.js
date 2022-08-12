import React, { useState, useContext } from "react";
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from "../pages/Error.js";
import PostIdPage from "../pages/PostIdPage"
import { privateRoutes, publicRoutes } from "../router/routes";
import Login from "../pages/Login";
import { AuthContext } from "../context";
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

export default AppRouter