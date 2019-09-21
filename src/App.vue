<template>
    <v-app>
        <v-app-bar app class="lime lighten-2">
            <v-toolbar-title class="headline text-uppercase">
                <span v-if="null === $store.state.list">Mes courses</span>
                <span v-else>{{$store.state.list.getFormatedDate()}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-speed-dial absolute top right v-model="fabOpen" direction="bottom">
                <template v-slot:activator>
                    <v-fab-transition>
                    <v-btn v-if="null != $store.state.user" fab large class="deep-purple accent-1 white--text">
                        <v-icon v-if="!fabOpen">mdi-menu</v-icon>
                        <v-icon v-else>mdi-close</v-icon>
                    </v-btn>
                    </v-fab-transition>
                </template>
            <v-btn fab @click="modalItemOpen = true" class="light-green white--text">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab @click="modalDeleteOpen = true" class="red lighten-1 white--text">
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn fab @click="$root.signOut()" class="pink lighten-4">
                <v-icon>mdi-account-off-outline</v-icon>
            </v-btn>
            </v-speed-dial>
        </v-app-bar>

        <v-content class="lime lighten-4">
            <transition name="fade" mode="out-in">
                <div v-if="!$store.state.user" key="login">
                    <login></login>
                </div>

                <div v-else key="list">
                    <myList v-if="$store.state.list && $store.state.list.hasItems()"></myList>
                    <div v-else class="elevation-2 mt-4 mx-1">
                        <v-simple-table>
                            <tr>
                                <td>Liste vide</td>
                            </tr>
                        </v-simple-table>
                    </div>
                </div>
            </transition>
        </v-content>

        <v-dialog v-model="modalItemOpen" width="500">
            <v-card class="mx-auto" v-if="!loading">
                <v-card-title>
                    Ajouter un produit
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Produit" v-model="name"></v-text-field>
                    <v-text-field label="Quantité" v-model="qte"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ma-5 red--text" small @click="modalItemOpen = false">
                        <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-5 green--text" small @click="addItem()">
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="modalDeleteOpen" width="500">
            <v-card class="mx-auto">
                <v-card-text class="pt-5">
                    <v-btn block @click="purgeItems()" class="deep-purple accent-1 white--text">Supprimer les produits grisés</v-btn>
                    <p class="text-center font-italic">ou</p>
                    <v-btn block @click="deleteList()" class="red lighten-1 white--text">Supprimer toute la liste</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="$root.modalInstallOpen" width="500">
            <v-card class="mx-auto">
                <v-card-title>Installer l'application ?</v-card-title>
                <v-card-text class="pt-5 text-center">
                    <v-btn  text @click="$root.intallPWa()" class="">Ok</v-btn>
                    <span class="text-center font-italic">ou</span>
                    <v-btn text @click="$root.modalInstallOpen = false" class="">Pus tard</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="$root.appInstalled" width="500">
            <v-card class="mx-auto">
                <v-card-title>Shopping List a bien été installé</v-card-title>
                <v-card-text class="pt-5 text-center">
                    <p>Nous vous invitons à passer sur l'application</p>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate class="ma-12"></v-progress-circular>
        </v-overlay>
    </v-app>
</template>

<script>
    import login from './components/login';
    import myList from './components/myList'

    import {ShoppingList} from './models/shoppingList';

    export default {
        name: 'App',
        components: {
            login, myList
        },
        data: () => ({
            fabOpen: false,
            modalItemOpen: false,
            modalDeleteOpen: false,
            modalInstallOpen: false,
            loading: false,
            overlay: false,
            name: '',
            qte: ''
        }),
        methods: {
            addItem() {
                let myList = this.$store.state.list;
                if (myList.addItem(this.name, this.qte)) {
                    this.modalItemOpen = false;
                    this.name = '';
                    this.qte = '';
                    this.overlay = true;
                    this.$store.commit('setList', myList);
                    this.$root.saveDb().then(() => {
                        this.overlay = false;
                    }).catch(() => {
                        this.overlay = false;
                    })
                }
            },
            purgeItems() {
                this.modalDeleteOpen = false;
                this.overlay = true;
                this.$store.commit('purgeItems');
                this.$root.saveDb().then(() => {
                    this.overlay = false;
                }).catch(() => {
                    console.log('err');
                    this.overlay = false;
                })
            },
            deleteList() {
                this.modalDeleteOpen = false;
                this.overlay = true;
                this.$store.commit('setList', new ShoppingList());
                this.$root.saveDb().then(() => {
                    this.overlay = false;
                }).catch(() => {
                    console.log('err');
                    this.overlay = false;
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: scale(.5);
    }
</style>
