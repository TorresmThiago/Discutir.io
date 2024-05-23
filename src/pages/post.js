import React, { useState, useEffect } from "react";
import { getPost } from "../services/getFromDatabase";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(id).then(post => {
            console.log(post)
            setPost(post);
        });
    }, [id]);

    return (
        <div className="image-text">
            <h2 className="image-title">{post.title}</h2>
            <span className="image-date">{post.date}</span>
            <span className="image-author">Por {post.author}</span>
        </div>
    );
}