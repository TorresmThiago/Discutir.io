import React, { useEffect } from "react";
import { useState } from "react";
import { addInteraction } from "../services/postInteractions";
import { getPosts } from "../services/getFromDatabase";

export default function LikeDislikeBlock({ postId, user }) {

    const [postInteractions, setPostInterations] = useState({});

    useEffect(() => {
        updateInteractions();
    }, [postId, user])

    function updateInteractions() {
        getPosts(postId).then(post => {
            if (post.likes === undefined)
                post.likes = {};
            setPostInterations(post.likes);
        });
    }

    async function interactWithPost(interaction) {
        try {
            await addInteraction(postId, user.uid, interaction);
            updateInteractions();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div class="like-dislike-container">
            <h3>Hora de discutir!</h3>
            <span class="like-dislike-stats">{postInteractions && Object.values(postInteractions).filter(interaction => interaction.like).length} likes</span>
            <span class="like-dislike-stats">{postInteractions && Object.values(postInteractions).filter(interaction => !interaction.like).length} dislikes</span>
            <button class="like-dislike-button like-button" onClick={() => { interactWithPost(true); }}>Like</button>
            <button class="like-dislike-button dislike-button" onClick={() => { interactWithPost(false); }}>Dislike</button>
        </div>
    );
}