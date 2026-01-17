import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBYQCFjm2EOeSF47S1hfon6diP2AyZhsGk",
    authDomain: "porcentagem-variaveis.firebaseapp.com",
    databaseURL: "https://porcentagem-variaveis-default-rtdb.firebaseio.com",
    projectId: "porcentagem-variaveis",
    storageBucket: "porcentagem-variaveis.firebasestorage.app",
    messagingSenderId: "394861336359",
    appId: "1:394861336359:web:33aaa574b50bd450e37b02",
    measurementId: "G-5EX2BGXRLH"
}

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Realtime Database
export const database = getDatabase(app)

export default app
