import { database } from "../config/firebaseConfig";
import { ref, get } from "firebase/database";

async function getPost(postId) {
    try {
        const postRef = ref(database, `posts/${postId}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getPosts() {
    try {
        const postsRef = ref(database, "posts");
        const snapshot = await get(postsRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const posts = Object.keys(data).map((key) => {
                return {
                    id: key,
                    ...data[key]
                };
            });
            return posts;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}


export { getPost, getPosts };
