import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

export default function() {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    console.log(initializeApp);
    const firebaseConfig = {
      apiKey: "AIzaSyA7a5glhwx1VKdb3kb34KD0Q69j0aygNBE",
      authDomain: "laba-30769.firebaseapp.com",
      databaseURL: "https://laba-30769.firebaseio.com",
      projectId: "laba-30769",
      storageBucket: "laba-30769.appspot.com",
      messagingSenderId: "724959992929",
      appId: "1:724959992929:web:1a74cfcfbef953dc8c1e20",
      measurementId: "G-9Z0GMGSKYC"
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    // const analytics = getAnalytics(app);
    return { storage }
}