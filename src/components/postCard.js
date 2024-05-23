import React from "react";

export default function PostCard({ post }) {
    const style = { backgroundImage: `url("${post.picture}")` };

    return (
        <a className="post-card overlay" style={style} href="/posts/-NyXlVpE4nhxRAvn36ky" >
            <div className="image-text">
                <h2 className="image-title">{post.title}</h2>
                <span className="image-date">{post.date}</span>
                <span className="image-author">Por {post.userId}</span>
            </div>
        </a>
    );
}