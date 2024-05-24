import * as moment from 'moment';
import 'moment/locale/pt-br';
import { database } from "../config/firebaseConfig";
import { push, ref, set } from "firebase/database";
import { uploadPhoto } from "./uploadPhoto";

moment.locale('pt-br');

async function uploadPost(post) {
    try {
        const photoURL = await uploadPhoto("image");
        post.picture = photoURL;

        if (post.postId) {
            set(ref(database, `posts/${post.postId}`), {
                title: post.title,
                description: post.description,
                picture: post.picture,
                userId: post.user.uid,
                author: post.user.displayName,
                date: moment().format("LLL"),
            });

            alert("Discussão editada com sucesso!");
            return;
        }

        const postsRef = ref(database, "posts");
        const newPostRef = push(postsRef);

        set(newPostRef, {
            title: post.title,
            description: post.description,
            picture: post.picture,
            userId: post.user.uid,
            author: post.user.displayName,
            date: moment().format("LLL"),
        });

        alert("Discussão publicada com sucesso!");
    } catch (error) {
        console.error(error);
    }
}

async function uploadComment(comment, postId) {
    try {
        push(ref(database, `posts/${postId}/comments`), {
            comment: comment.text,
            user: comment.user.uid,
            author: comment.user.displayName,
            profilePicture: comment.user.photoURL,
            date: moment().format("LLL")
        });
    } catch (error) {
        console.error(error);
    }
}

async function uploadUser(user) {
    try {
        set(ref(database, `users/${user.userID}`), {
            username: user.username,
            userPhoto: user.profilePicture,
            email: user.email
        });
    } catch (error) {
        console.error(error);
    }
}

export { uploadPost, uploadComment, uploadUser };
