import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadPhoto = async (elementId) => {
    return new Promise((resolve, reject) => {
        const file = document.getElementById(elementId).files[0];
        const fileName = Date.now();
        const storageRef = ref(storage, 'photos/photo/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', null, null, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        });
    });
}

export { uploadPhoto };