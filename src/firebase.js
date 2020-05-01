import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyAUDexVxDKeNwOkzXl4xWYjxHFG8hRBEI8",
    authDomain: "proyectofinal-651fd.firebaseapp.com",
    databaseURL: "https://proyectofinal-651fd.firebaseio.com",
    projectId: "proyectofinal-651fd",
    storageBucket: "proyectofinal-651fd.appspot.com",
    messagingSenderId: "252565880685",
    appId: "1:252565880685:web:366cb267ece813c79fe464",
    measurementId: "G-M9N1B9VFSN"
  };
  


   

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}


	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}


}

export default new Firebase()