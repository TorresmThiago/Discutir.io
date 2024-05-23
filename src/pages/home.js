import React from "react";
import { PostList } from "../components";
import { useEffect, useState } from "react";
import { getPosts } from "../services/getFromDatabase";

export default function Home({ user }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
        });
    }, []);

    return <section className="container home">
        <div className="row">
            <h2>Trending Posts</h2>
            <PostList posts={posts} columns={1} />
        </div>
    </section>;
}