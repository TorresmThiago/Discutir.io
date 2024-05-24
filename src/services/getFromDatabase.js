import { database } from "../config/firebaseConfig";
import { ref, get } from "firebase/database";

async function getPosts(postId = null, userId = null) {
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

            if (postId) {
                return posts.find((post) => post.id === postId);
            }

            if (userId) {
                return posts.filter((post) => post.userId === userId);
            }

            return posts;

        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    const usersSnapshot = await get(ref(database, `users`));

    if (!usersSnapshot.exists()) {
        return null;
    }

    return usersSnapshot.val();
}

async function getUserFromId(userId) {
    const users = await getUsers();
    return users[userId];
}

async function getAllUsersLikes() {
    let usersLikes = {};
    try {
        const users = await getUsers();
        const posts = await getPosts();

        Object.keys(users).forEach(user => {
            usersLikes[user] = {
                likeCount: 0,
                username: users[user].username
            }
        });

        for (let post of posts) {
            if (!post.likes) {
                continue;
            }
            let temp = Object.values(post.likes).filter(interaction => interaction.like).length
            usersLikes[post.userId].likeCount += temp;
        }

    } catch (error) {
        console.error(error);
    }

    const sortedUsersLikes = Object.fromEntries(
        Object.entries(usersLikes).sort(([, a], [, b]) => b.likeCount - a.likeCount)
    );

    return sortedUsersLikes;
}

export { getPosts, getAllUsersLikes, getUserFromId };
