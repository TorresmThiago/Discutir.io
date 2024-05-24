import { database } from "../config/firebaseConfig";
import { ref, set, get } from "firebase/database";

async function addInteraction(postId, userId, interaction) {
    try {
        const snapshot = await get(ref(database, `posts/${postId}/likes/${userId}`));
        if (snapshot.exists()) {
            if ((snapshot.val().like && interaction) || (!snapshot.val().like && !interaction)) {
                set(ref(database, `posts/${postId}/likes/${userId}`), null);
                return;
            }
        }

        set(ref(database, `posts/${postId}/likes/${userId}`), {
            like: interaction
        });

    } catch (error) {
        console.error(error);
    }
}

export { addInteraction };