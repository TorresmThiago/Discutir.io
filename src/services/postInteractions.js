import { database } from "../config/firebaseConfig";
import { ref, set } from "firebase/database";

async function likePost(postId, userId) {
    try {
        set(ref(database, `posts/${postId}/likes/${userId}`), {
            userId: userId
        });
        set(ref(database, `users/${userId}/likes/${postId}/${userId}`), {
            like: true
        });
    } catch (error) {
        console.error(error);
    }
}

async function dislikePost(postId, userId) {
    try {
        set(ref(database, `posts/${postId}/likes/${userId}`), {
            userId: userId
        });
        set(ref(database, `users/${userId}/likes/${postId}/${userId}`), {
            like: false
        });
    } catch (error) {
        console.error(error);
    }
}

async function removeInteraction(postId, userId) {
    try {
        set(ref(database, `posts/${postId}/likes/${userId}`), null);
    } catch (error) {
        console.error(error);
    }
}

async function checkInteraction(postId, userId, interaction) {
    const snapshot = await get(ref(database, `posts/${postId}/${interaction}/${userId}`));
    return snapshot.exists();
}

async function getPostInteractions(postId, interaction) {
    const snapshot = await get(ref(database, `posts/${postId}/likes`));
    return snapshot.val();
}

async function getPostComments(postId) {
    const snapshot = await get(ref(database, `posts/${postId}/comments`));
    return snapshot.val();
}

async function getUserLikes(userId) {
    const snapshot = await get(ref(database, `users/${userId}/likes`));
    return snapshot.val();
}

export { likePost, dislikePost };