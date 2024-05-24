import React from "react";
import { PostList } from "../components";
import { useEffect, useState } from "react";
import { getPosts } from "../services/getFromDatabase";

export default function Home({ user }) {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
        });
    }, []);

    return <section className="container home">
        {posts ? (
            <div className="row">
                <h2>Últimas postagens</h2>
                {posts && <PostList posts={posts} columns={1} />}
            </div>
        ) : (
            <p>Carregando...</p>
        )}
    </section>;
}