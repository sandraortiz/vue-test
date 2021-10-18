import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBOTcZL3g_TS3aZ-JtbPuMw7WJEivPW0i8",
  authDomain: "vue-firebase-test-7404a.firebaseapp.com",
  projectId: "vue-firebase-test-7404a",
  storageBucket: "vue-firebase-test-7404a.appspot.com",
  messagingSenderId: "240431790898",
  appId: "1:240431790898:web:9177b6136423434ef6752b",
  measurementId: "G-RMVYFT7QCS"
};
import { getAnalytics } from "firebase/analytics";

const analytics = getAnalytics();
logEvent(analytics, 'notification_received');


export {  analytics}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

createApp(App).use(store).use(router).mount('#app')

