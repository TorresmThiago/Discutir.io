import React, { useState } from "react";
import { loginEmailPassword } from "../services/userAuthentication";
import { useNavigate } from "react-router-dom";

export default function Login({ user }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userData = {
        email: email,
        password: password
    }

    async function handleLogin() {
        loginEmailPassword(userData);
        navigate('/');
    }

    return (
        <div class="form-container">
            <form class="form">
                <center>
                    <h1>Entre na plataforma para conversar com outros usuários!</h1>
                </center>
                <div class="form-group">
                    <input id="txtEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Email</label>
                </div>
                <div class="form-group">
                    <input id="txtPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Senha</label>
                </div>
                <button id="btnLogin" type="button" class="button buttonBlue" onClick={() => handleLogin()}>Entrar</button>
            </form>
        </div>

    );
}