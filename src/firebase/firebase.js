// @ts-nocheck
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBhyv1AkolzMqdFpe7OJ4yT56kg7Rd5RKI",
    authDomain: "androidfirebasecheck-dd678.firebaseapp.com",
    projectId: "androidfirebasecheck-dd678",
    storageBucket: "androidfirebasecheck-dd678.appspot.com",
    messagingSenderId: "87166052723",
    appId: "1:87166052723:web:c70dfc5fae277459cc7d06",
    databaseURL: "https://androidfirebasecheck-dd678-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
