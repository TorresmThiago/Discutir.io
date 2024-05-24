import React from "react";

export default function PostCard({ post }) {
    const style = { backgroundImage: `url("${post.picture}")` };

    post.description = post.description.substring(0, 100) + "...";

    return (
        <a className="post-card overlay" style={style} href={`/posts/${post.id}`} >
            <div className="image-text">
                <h2 className="image-title">{post.title}</h2>
                <span className="image-date">{post.date}</span>
                <span className="image-author">Por {post.author}</span>
                <p className="image-content">{post.description}</p>
            </div>
        </a>
    );
}   