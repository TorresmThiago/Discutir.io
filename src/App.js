import React, { useState } from 'react';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Post from './pages/post';


function App() {

    const [user, setUser] = useState(null);

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }

    monitorAuthState();

    return (
        <Router>
            <div className="App">
                <Navigation user={user} />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/about" element={<About user={user} />} />
                    <Route path="/contact" element={<Contact user={user} />} />
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path='*' element={<Navigate to='/' user={user} />} />
                    <Route path='/posts/:id' element={<Post user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
