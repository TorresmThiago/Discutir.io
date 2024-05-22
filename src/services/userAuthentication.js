import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { uploadUser } from "./uploadToDatabase";
import { uploadPhoto } from "./uploadPhoto";

async function loginEmailPassword(userData) {
    try {
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
    } catch (error) {
        console.error(error);
    }
}

async function createAccount(userData) {
    const user = {
        username: "Teste"//userData.nome,
    };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        user.userID = userCredential.user.uid;

        const photoURL = await uploadPhoto("userPhoto");
        user.userPhoto = photoURL;

        uploadUser(user);
    } catch (error) {
        console.error(error);
    }
}
async function logout() {
    await signOut(auth);
}

export { loginEmailPassword, createAccount, logout };