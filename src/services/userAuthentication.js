import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, updateEmail, createUserWithEmailAndPassword, signOut, updateProfile, deleteUser } from "firebase/auth";
import { uploadUser } from "./uploadToDatabase";
import { uploadPhoto } from "./uploadPhoto";

async function loginEmailPassword(userData) {
    try {
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
    } catch (error) {
        console.error(error);
    }
}

async function createAccount(userData, update = false) {
    const user = {
        username: userData.username,
        email: userData.email
    };

    try {
        const userCredential = update ? auth.currentUser : (await createUserWithEmailAndPassword(auth, userData.email, userData.password)).user;

        const pictureURL = await uploadPhoto("image");

        user.profilePicture = pictureURL;
        user.userID = userCredential.uid;
        updateUser(user.username, user.profilePicture)
        uploadUser(user);
    } catch (error) {
        console.error(error);
    }
}
async function logout() {
    await signOut(auth);
}

async function updateUser(displayName, photoURL) {
    updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
    }).then(() => {
        console.log("User updated");
    }).catch((error) => {
        console.error(error);
    });

}

async function getUser() {
    return auth.currentUser;
}

async function deleteCurrentUser() {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        alert("User deleted");
    }).catch((error) => {
        console.error(error);
    });
}

export { loginEmailPassword, createAccount, logout, getUser, deleteCurrentUser, updateUser };