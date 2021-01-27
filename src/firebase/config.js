import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkSSX-BO-J232K4bSglmi_G2g7PZtPqR0",
  authDomain: "best-buds-social.firebaseapp.com",
  databaseURL: "https://best-buds-social.firebaseio.com",
  projectId: "best-buds-social",
  storageBucket: "best-buds-social.appspot.com",
  messagingSenderId: "984969077470", //GCM_SENDER_ID
  appId: "1:984969077470:ios:9a4a1bc57a7769a92d984f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

// This would typically be a gitignore file and not be publicly available on Github. Firebase has own database security rules.
