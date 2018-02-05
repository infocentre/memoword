import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAlAePC-fyjJKkbZXTbAVI-Q6kViwYofZw',
  authDomain: 'test-68c08.firebaseapp.com',
  databaseURL: 'https://test-68c08.firebaseio.com',
  projectId: 'test-68c08',
  storageBucket: 'test-68c08.appspot.com',
  messagingSenderId: '853445854136'
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
