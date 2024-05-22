import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/scss/base.scss'
import { Avatar } from "antd";
import { logout } from "../services/userAuthentication";

const navLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Contact",
        path: "/contact"
    },
    {
        title: "Login",
        path: "/login"
    }
];

export default function Navigation({ user }) {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <nav className="site-navigation">
            <span className="menu-title">Discutir.io</span>
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
                        <Avatar size="large" icon="user" />
                        <span className="menu-avatar-name">{`${user.firstName} ${user.lastName}`} </span>
                        <button className="button buttonBlue" onClick={async () => { await logout() }}>Logout</button>
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