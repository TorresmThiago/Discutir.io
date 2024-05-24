import React, { useState, useEffect } from "react";
import { getAllUsersLikes } from "../services/getFromDatabase";

export default function Ranking(user) {

    const [usersLikes, setUsersLikes] = useState(null);

    useEffect(() => {
        getAllUsersLikes().then((usersLikes) => {
            setUsersLikes(usersLikes);
            console.log(usersLikes)
        });
    }
        , []);

    return (
        <div>
            <center>
                <h1>Ranking de curtidas</h1>
            </center>
            {usersLikes ? (
                <table>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Curtidas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(usersLikes).map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{usersLikes[user].username}</td>
                                    <td>{usersLikes[user].likeCount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Carregando...</p>

            )}
        </div>
    );
}