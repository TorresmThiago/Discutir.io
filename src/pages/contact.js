import React from "react";
import { useState } from "react";
import { uploadPost, uploadComment } from "../services/uploadToDatabase";

export default function Contact({ user }) {

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const [comment, setComment] = useState("");

    const post = {
        title: title,
        subtitle: subtitle,
        picture: "",
        comments: [],
        user: user
    }

    const postComment = {
        text: comment,
        user: user
    }

    return (
        <div>
            <h1>Adicionar post</h1>
            <div>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                <input type="file" id="photo" accept="image/*" />

                <button onClick={() => { uploadPost(post); }}>Add Data</button>
                <button onClick={() => { LikePost(postId, user); }}>Add Data</button>
            </div>
            <h1>Adicionar comentario</h1>
            <div>
                <input type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={() => { uploadComment(postComment, "-NyUPltZQnhDlyD0akfH") }}>Add Data</button>
            </div>
            <h1>Resultado</h1>
            <div>

            </div>
        </div>
    );
}