import React from "react";
import { PostList } from "../components";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebaseConfig";

export default function Home({ user }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postsRef = ref(database, "posts");
        get(postsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const posts = Object.keys(data).map((key) => {
                    return {
                        id: key,
                        ...data[key]
                    };
                });
                setPosts(posts);
                console.log(posts);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return <section className="container home">
        <div className="row">
            <h2>Trending Posts</h2>
            <PostList posts={posts} columns={1} />
        </div>
    </section>;
}