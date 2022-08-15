import React, { useState, useEffect } from "react";
import { BrowserRouter/*, Link, Routes, Route, Navigate*/ } from 'react-router-dom';
import { AuthContext } from "../context";
//import Home from '../pages/Home'; not uses
//import About from '../pages/About'; not uses
//import Posts from '../pages/Posts'; not uses
import Navbar from "./UI/navbar/Navbar";
//import Error from "../pages/Error.js"; not uses
import AppRouter from "./AppRouter";
import "../styles/App.css";

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