import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database';
import { firebaseConfig } from './firebaseConfig' 


firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const database = firebase.database() 

export default firebase;