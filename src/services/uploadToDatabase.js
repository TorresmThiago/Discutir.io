import { database } from "../config/firebaseConfig";
import { push, ref, set } from "firebase/database";
import { uploadPhoto } from "./uploadPhoto";

async function uploadPost(post) {
    try {
        const photoURL = await uploadPhoto("photo");
        post.picture = photoURL;

        const postsRef = ref(database, "posts");
        const newPostRef = push(postsRef);

        set(newPostRef, {
            title: post.title,
            subtitle: post.subtitle,
            picture: post.picture,
            userId: post.user.uid,
            date: new Date().toISOString(),
            comments: []
        });

        alert("Data added successfully");
    } catch (error) {
        console.error(error);
    }
}

async function uploadComment(comment, postId) {
    console.log("Chamei")
    console.log(comment.text)
    console.log(comment.user.uid)
    try {
        push(ref(database, `posts/${postId}/comments`), {
            comment: comment.text,
            user: comment.user.uid,
            date: new Date().toISOString()
        });

        alert("Data added successfully");
    } catch (error) {
        console.error(error);
    }
}

async function uploadUser(user) {
    try {
        set(ref(database, `users/${user.userID}`), {
            username: user.username,
            userPhoto: user.userPhoto
        });
    } catch (error) {
        console.error(error);
    }
}

export { uploadPost, uploadComment, uploadUser };
