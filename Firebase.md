# Firebase

## Account

Our gmail account username and password are as follows:
```
username: intaketriageapp@gmail.com
password: leafleaf4002!
```

*Note we will need to change our password when we publicise the repo.*

## Structure

```
↳ admins
  ↳ admin docs
↳ workers
  ↳ worker docs
↳ leaders
  ↳ leader docs
↳ patients
  ↳ patient docs
```

## Firestore

We're using Firebase's Firestore.

*Note that specifically, we're using the Firebase JS SDK which supports Expo Go. We're NOT using React Native Firebase.*

Links:

[Firestore](https://console.firebase.google.com/u/0/project/leaf-f184f/firestore/data/~2Fusers~2F9Xq5YoymM0AAHAIUkKHL)

[Project](https://console.firebase.google.com/u/0/project/leaf-f184f/overview)

[Account](https://console.firebase.google.com/u/0/?pli=1)

## Setup Details

Create a new project at https://console.firebase.google.com/u/0/?pli=1. 

Run in the project directory:

```
npx expo install firebase
```

Register a new app. Go to the firebase project and click the **Web **(**</>**) icon to add a new app. You'll get a bunch of code.

Adjust it so it looks something like the following, and add it to the project directory as `firebaseConfig.js`.

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

Run in the project directory:

```
npx expo customize metro.config.js
```

Then open `metro.config.js` and replace everything with:

```javascript
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
```

Then go to the Firebase project. In the left toolbar, select Build then select Firestore Database. Go through the steps of creation. I put the region to Sydney because this is an Australian app and we want speeeed. I also set it to test mode because it's easier to set up this way.

Now everything is set up. Try the following in the app:

```typescript
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

// ...

try {
    const docRef = await addDoc(collection(db, "users"), {
        first: "Yeet",
        last: "Lovelace",
        born: 1815
    });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
}
```

You should see the document pop up in the **Data**, **Panel view** section of the app (with the collections and data and stuff).