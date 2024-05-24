import React, { useState, useEffect } from "react";
import { getPosts } from "../services/getFromDatabase";
import { useParams } from "react-router-dom";
import CommentBlock from "../components/commentBlock";
import LikeDislikeBlock from "../components/likeDislikeBlock";
import { useNavigate } from "react-router-dom";
import { removePost } from "../services/removeFromDatabase";

export default function Post({ user }) {
    const { id } = useParams();

    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    useEffect(() => {
        console.log(id)
        getPosts(id).then(post => {
            setPost(post);
        });
    }, [id]);

    function handleEdit() {
        navigate(`/post/edit/${id}`);
    }

    function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este post?")) {
            removePost(id);
            navigate("/");
        }
    }

    return (
        <div className="image-text">
            {post ? (
                <div class="post-container">
                    {user && post.userId === user.uid ? (
                        <div class="edit-options">
                            <h2>Editar post</h2>
                            <button onClick={() => handleEdit()}>Editar</button>
                            <button onClick={() => handleDelete()}>Excluir</button>
                        </div>
                    ) : null}

                    <img class="post-image" src={post.picture} alt={post.title} />
                    <h2 class="post-title">{post.title}</h2>
                    <span class="post-date">{post.date}</span>
                    <span class="post-author">Por {post.author}</span>
                    <p class="post-content">{post.description}</p>
                    <LikeDislikeBlock postId={id} user={user} />
                    {<h3>Comentários</h3>}
                    <div class="comment-section">
                        <CommentBlock postId={id} user={user} />
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )
            }
        </div >
    );
}