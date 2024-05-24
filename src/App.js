import React, { useState } from 'react';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Home from './pages/home';
import Login from './pages/login';
import Post from './pages/post';
import Ranking from './pages/ranking';
import NewPost from './pages/newPost';
import Cadastro from './pages/cadastro';
import Profile from './pages/profile';

function App() {

    const [user, setUser] = useState(null);

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            setUser(user);
        });
    }

    monitorAuthState();

    return (
        <Router>
            <div className="App">
                <Navigation user={user} />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path='/ranking' element={<Ranking user={user} />} />
                    <Route path="/post" element={<NewPost user={user} />} />
                    <Route path='/post/edit/:id' element={<NewPost user={user} />} />
                    <Route path="/cadastro" element={<Cadastro user={user} />} />
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path="/profile/:id" element={<Profile currentUser={user} />} />
                    <Route path="/profile/edit/:id" element={<Cadastro currentUser={user} />} />
                    <Route path='/posts/:id' element={<Post user={user} />} />
                    <Route path='*' element={<Navigate to='/' user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
