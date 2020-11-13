import firebase from '../config/firebase'
import { createStore, combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

import CertificateReducer from './reducers/certificate'



// React-Redux-Firebase Config
const rrfConfig = {
  userProfile: 'USERS',
  useFirestoreForProfile: true
}

console.log("Certi", CertificateReducer)

// Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  certificate: CertificateReducer
})

// Creating store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}