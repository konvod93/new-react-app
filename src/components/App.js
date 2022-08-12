import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Navbar from "./UI/navbar/Navbar";
import Error from "../pages/Error.js";
import AppRouter from "./AppRouter";
import { AuthContext } from "../context";





function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )

}

export default App;
