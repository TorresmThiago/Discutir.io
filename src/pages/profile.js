import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostList } from "../components";
import { getPosts, getUserFromId } from "../services/getFromDatabase";
import { removeUser } from "../services/removeFromDatabase";
import { useNavigate } from "react-router-dom";
import { deleteCurrentUser } from "../services/userAuthentication";

export default function Profile({ currentUser }) {

    let { id } = useParams();

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserFromId(id).then(user => {
            setUser(user);
        });

        getPosts(null, id).then(posts => {
            setPosts(posts);
        });
    });

    function handleEdit() {
        navigate(`/profile/edit/${id}`);
    }

    async function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir essa conta?")) {
            if (window.confirm("Tem certeza MESMO que deseja excluir essa conta?")) {
                deleteCurrentUser().then(() => {
                    alert("Conta excluída");
                    removeUser(id);
                    navigate("/");
                });
            }
        }
    }

    return (
        <div>
            {user ? (
                <div className="profile-container">
                    <h1>Perfil de usuário</h1>
                    <img className="profile-picture" src={user.userPhoto} alt={user.username} />
                    <p className="profile-username">{user.username}</p>
                    <p>Email: {user.email}</p>
                    <div className="profile-posts-container">
                        <h2>Posts</h2>
                        <PostList posts={posts} columns={1} />
                        {posts.length === 0 ? <p>Este usuário ainda não fez nenhuma postagem.</p> : null}
                    </div>
                    {currentUser && currentUser.uid === id ? (
                        <div className="profile-button-container">
                            <h2>Editar Perfil</h2>
                            <button className="edit-button" onClick={() => handleEdit()}>Editar</button>
                            <button className="delete-button" onClick={() => handleDelete()}>Excluir</button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}