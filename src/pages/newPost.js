import React, { useEffect, useState } from 'react';
import { uploadPost } from '../services/uploadToDatabase';
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from '../services/getFromDatabase';

export default function NewPostForm(user) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState("");

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getPosts(id).then(post => {
                // if (post.userId !== user.uid) {
                //     alert("Você não tem permissão para editar esta discussão!");
                //     navigate(`/posts/${id}`);
                //     return;
                // }
                setTitle(post.title);
                setDescription(post.description);
            });
        }
    }, [id]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const post = {
            title: title,
            description: description,
            image: image,
            user: user.user,
            postId: id
        };

        if (user === null) {
            alert("Você precisa estar logado para publicar uma discussão!");
            return;
        }

        await uploadPost(post);
        setTitle('');
        setDescription('');
        setImage(null);

        if (id) {
            navigate(`/posts/${id}`);
            return;
        }

        navigate('/');
    };

    return (
        <div class="form-container">
            <form class="form" onSubmit={handleSubmit}>
                <center>
                    <h1>Hora de iniciar uma nova discussão!</h1>
                </center>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label htmlFor="image">Imagem:</label>
                    <input type="file" id="image" accept="image/*" required />
                </div>
                <center>
                    {id ? <button type="submit">Editar Postagem</button> : <button type="submit">Criar Postagem</button>}
                </center>
            </form>
        </div>

    );
}