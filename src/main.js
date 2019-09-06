import Vue from 'vue'
import App from './App.vue'
import store from './store'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import vuetify from './plugins/vuetify';

// Models
import {User} from './models/user';
import {ShoppingList} from './models/shoppingList';

const firebaseConfig = {
    apiKey: "AIzaSyBb2RU1WDHwd9t37WwC7xh7h2yfM5-_eGM",
    authDomain: "newlist-79f4a.firebaseapp.com",
    databaseURL: "https://newlist-79f4a.firebaseio.com",
    projectId: "newlist-79f4a",
    storageBucket: "newlist-79f4a.appspot.com",
    messagingSenderId: "781725545463",
    appId: "1:781725545463:web:9135e7dc1c2d86ff"
};

Vue.config.productionTip = false;

new Vue({
    store,

    created: function() {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let newUser = new User(user);
                this.$store.commit('setUser', newUser);
                this.$store.commit('setList', new ShoppingList());
                this.startDbListenner(newUser.uid);
            } else {
                console.log('/auth')
            }
        });
    },

    methods: {
        logIn(email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((data) => {
                    let newUser = new User(data.user);
                    this.$store.commit('setUser', newUser);
                    this.startDbListenner(newUser.uid);
                })
                .catch((err) => {
                    console.log('error ', err)
                })
        },
        signIn(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    let newUser = new User(data.user);
                    this.$store.commit('setUser', newUser);

                    let newList = new ShoppingList();
                    this.$store.commit('setList', newList);

                    this.saveDb().then(() => {
                        this.startDbListenner(newUser.uid);
                    })
                })
                .catch((err) => {
                    console.log('error ', err)
                })
        },
        signOut() {
            firebase.auth().signOut().then(() => {
                this.$store.commit('deleteUser');
            }, function (error) {
                console.log('error: ', error);
            });
        },
        startDbListenner() {
            let myDbRef = firebase.database().ref('lists/' + this.$store.state.user.uid);
            myDbRef.on('value', (snapshot) => {
                let myList = new ShoppingList(snapshot.val().shoppingList);
                if (null === this.$store.state.list || JSON.stringify(myList.asObject()) !== JSON.stringify(this.$store.state.list.asObject())) {
                    console.log(JSON.stringify(myList.asObject()) === JSON.stringify(this.$store.state.list.asObject()));
                    this.$store.commit('setList', myList);
                    console.log('ding');
                }
            });
        },
        saveDb() {
            return new Promise((resolve, reject) => {
                let myDbRef = firebase.database().ref('lists/' + this.$store.state.user.uid);
                myDbRef.update({
                    shoppingList: this.$store.state.list.asObject()
                }).then(() => {
                    resolve(true);
                }).catch(() => {
                    reject(false);
                })
            })

        }
    },

    vuetify,
    render: h => h(App)
}).$mount('#app')
