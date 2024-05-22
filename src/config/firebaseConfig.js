import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmHBkm-QLjwXacG7sJ1oe3WLjfdi_o2xc",
    authDomain: "discutir-io.firebaseapp.com",
    databaseURL: "https://discutir-io-default-rtdb.firebaseio.com",
    projectId: "discutir-io",
    storageBucket: "discutir-io.appspot.com",
    messagingSenderId: "989224812317",
    appId: "1:989224812317:web:8abd3465e67afbb15b6bf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app, "https://discutir-io-default-rtdb.firebaseio.com");
const storage = getStorage(app, "discutir-io.appspot.com");
const auth = getAuth(app);

export { database, storage, auth };