import React, { useEffect } from "react";
import { useState } from "react";
import { uploadComment } from "../services/uploadToDatabase";
import { getPosts } from "../services/getFromDatabase";
import { Avatar } from "antd";


export default function CommentBlock({ postId, user }) {

    const [commentText, setCommentText] = useState("");
    const [postComments, setPostComments] = useState({});

    useEffect(() => {
        console.log(user);
        updateComments();
    }, [postId, user]);

    const comment = {
        text: commentText,
        user: user
    }

    function updateComments() {
        getPosts(postId).then(post => {
            setPostComments(post.comments);
        });
    }

    function commentPost() {
        try {
            uploadComment(comment, postId);
            updateComments();
            setCommentText("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div class="comment-container">
            {postComments && Object.values(postComments).map((comment, index) => {
                return (
                    <div class="comment" key={index}>
                        <a href={`/profile/${user.uid}`} class="comment-avatar">
                            <Avatar size="small" src={`${comment.profilePicture}`} />
                        </a>
                        <span class="comment-author">{comment.author}</span>
                        <p class="comment-content">{comment.comment}</p>
                    </div>
                );
            })}
            <div class="comment-input">
                <input type="text" placeholder="Comentar" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                <button onClick={() => { commentPost() }}>Adicionar Comentário</button>
            </div>
        </div>
    );
}