// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD2zHkVHavWtCigWs9HP_Ow3MbPwbtL55I",
  authDomain: "loginamadeusbooking.firebaseapp.com",
  projectId: "loginamadeusbooking",
  storageBucket: "loginamadeusbooking.appspot.com",
  messagingSenderId: "1739412710",
  appId: "1:1739412710:web:7d93754d7b08a61d755727"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig) // khởi tạo firebase

export const auth = getAuth()
export const db = getFirestore(app)

export default app
