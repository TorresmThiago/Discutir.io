import React, { useState } from "react";
import { loginEmailPassword, createAccount } from "../services/userAuthentication";

export default function Login({ user }) {

    const [error] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userData = {
        email: email,
        password: password
    }

    return (
        <div>
            <div id="login">
                <div class="header">
                    <h1>Entre na plataforma para conversar com outros usuários!</h1>
                </div>
                <form>
                    <div class="group">
                        <input id="txtEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div class="group">
                        <input id="txtPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Senha</label>
                    </div>
                    <div class="group">
                        <input type="file" id="userPhoto" accept="image/*" />
                    </div>
                    {error && (<div id="divLoginError" class="group">
                        <div id="lblLoginErrorMessage" class="errorlabel">{error}</div>
                    </div>)}
                    <button id="btnLogin" type="button" class="button buttonBlue" onClick={() => loginEmailPassword(userData)}>Entrar</button>
                    <button id="btnSignup" type="button" class="button buttonBlue" onClick={() => createAccount(userData)}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}