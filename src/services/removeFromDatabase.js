import { database } from "../config/firebaseConfig";
import { ref, remove } from "firebase/database";

async function removePost(postId) {
    try {
        await remove(ref(database, `posts/${postId}`));
    } catch (error) {
        console.error(error);
    }
}

async function removeUser(userId) {
    try {
        await remove(ref(database, `users/${userId}`));
    } catch (error) {
        console.error(error);
    }
}

export { removePost, removeUser };
