import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadPhoto = async (elementId) => {
    return new Promise((resolve, reject) => {
        var file = document.getElementById(elementId).files[0];
        var storageRef = ref(storage, 'photos/photo');
        var uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', null, null, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
            });
        });
    });
}

export { uploadPhoto };