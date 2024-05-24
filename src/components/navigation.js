import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/scss/base.scss'
import { Avatar } from "antd";
import { logout } from "../services/userAuthentication";
import logo from "../assets/images/logo.png";

export default function Navigation({ user }) {
    const [menuActive, setMenuActive] = useState(false);

    const navigate = useNavigate();

    const navLinks = [
        {
            title: "Home",
            path: "/"
        },
    ];

    if (user) {
        navLinks.push({
            title: "Ranking",
            path: "/ranking"
        });
        navLinks.push({
            title: "Nova Discussão",
            path: "/post"
        });
    } else {
        navLinks.push({
            title: "Cadastro",
            path: "/cadastro"
        });
    }

    return (
        <nav className="site-navigation">
            <span className="menu-title">
                <img className="logo" src={logo} alt="Engaja Fácil" />
            </span>
            <div className={`menu-content-container ${menuActive && 'active'}`}>
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
                {user ? (
                    <div className="menu-avatar-container">
                        <a href={`/profile/${user.uid}`}>
                            <Avatar size="100px" src={`${user.photoURL}`} />
                        </a>
                        <span className="menu-avatar-name">Olá {`${user.displayName}`}! </span>
                        <button className="button buttonBlue" onClick={() => navigate("/profile/" + user.uid)}>Perfil</button>
                        <button className="button buttonBlue" onClick={async () => { await logout(); navigate("/") }}>Logout</button>
                    </div>
                ) : (
                    <div className="menu-login-message">
                        Realizar <Link to="/login">Login</Link> na plataforma!
                    </div>
                )}
            </div>
            <i className="ionicons icon ion-ios-menu" onClick={() => setMenuActive(!menuActive)}></i>
        </nav >
    );
}