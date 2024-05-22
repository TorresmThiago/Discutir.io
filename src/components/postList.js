import React from "react";
import { PostCard } from "./";

export default function PostList({ posts, columns }) {
    return (
        <section className="post-list" style={{ gridTemplateColumns: `repeat(${columns}, minmax(275px, 1fr))` }}>
            {posts.map((post, index) =>
                <PostCard {...{ post, index, key: index }} />
            )}
        </section>
    )
}