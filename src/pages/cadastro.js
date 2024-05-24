import React, { useEffect, useState } from 'react';
import { createAccount } from "../services/userAuthentication";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFromId } from '../services/getFromDatabase';

export default function Cadastro(user) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserFromId(id).then(user => {
                if (user.userId !== user.uid) {
                    alert("Você não tem permissão para editar este perfil!");
                    navigate(`/profile/${id}`);
                    return;
                }
                if (!load) {
                    setLoad(true);
                    setUsername(user.username);
                    setEmail(user.email);
                }
            });
        }
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            email: email,
            password: password
        }

        console.log(userData)
        await createAccount(userData, id ? true : false);

        if (id) {
            navigate(`/profile/${id}`);
            return;
        }

        navigate('/');
    };


    return (
        <div class="form-container">
            <form class="form" onSubmit={handleSubmit}>
                <center>
                    <h1>Seja bem vindo a nossa rede!</h1>
                </center>
                <div class="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="photo">Foto:</label>
                    <input type="file" id="image" accept="image/*" required />
                </div>
                {id ? <button type="submit">Editar</button> : <button type="submit">Cadastrar</button>}
            </form>
        </div>

    );
}