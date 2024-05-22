import React from "react";

export default function PostCard({ post }) {
    const style = { backgroundImage: `url("${require(`../assets/images/${post.image}`)}")` };

    return (
        <a className="post-card overlay" style={style} href={post.link} >
            <div className="image-text">
                <h2 className="image-title">{post.title}</h2>
                <span className="image-date">{post.date}</span>
                <span className="image-author">Por {post.author}</span>
            </div>
        </a>
    );
}