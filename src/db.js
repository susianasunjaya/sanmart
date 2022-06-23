// Conveniently import this file anywhere to use db

import  { firestore , initializeApp} from 'firebase/app'
import 'firebase/firestore'

export const firebaseConfig = {

        apiKey: "AIzaSyD1rcTB84YH3b7N6wq4lGN40UrV6v7c8Pc",
      
        authDomain: "sanmart-30425.firebaseapp.com",
      
        projectId: "sanmart-30425",
      
        storageBucket: "sanmart-30425.appspot.com",
      
        messagingSenderId: "122907203649",
      
        appId: "1:122907203649:web:313a93b363f3d9ef014ec0",
      
        measurementId: "G-2Q7HSMT8Z8"
      
      
       }

    const app = initializeApp(firebaseConfig);
      export const db = firestore(app);


// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
