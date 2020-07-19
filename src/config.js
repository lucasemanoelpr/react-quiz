import firebase from 'firebase'
import Rebase from 're-base'

const firebaseInfo = firebase.initializeApp ({
    apiKey: "AIzaSyCDXf1RyUIThtr7akmqZ5d4aCxnknYsHBo",
    authDomain: "react-quiz-learning.firebaseapp.com",
    databaseURL: "https://react-quiz-learning.firebaseio.com",
    projectId: "react-quiz-learning",
    storageBucket: "react-quiz-learning.appspot.com",
    messagingSenderId: "626615499533"
});
const db = firebase.database(firebaseInfo)
const config = Rebase.createClass(db)

export const providers = {
    'facebook' : new firebase.auth.FacebookAuthProvider,
    'twitter'  : new firebase.auth.TwitterAuthProvider
}

export const auth = firebaseInfo.auth()

export default config