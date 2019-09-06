<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Mes courses</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-speed-dial absolute top right v-model="fabOpen" direction="bottom">
                <template v-slot:activator>
                    <v-fab-transition>
                    <v-btn  v-if="null != $store.state.user" fab large>
                        <v-icon v-if="!fabOpen">mdi-menu</v-icon>
                        <v-icon v-else>mdi-close</v-icon>
                    </v-btn>
                    </v-fab-transition>
                </template>
            <v-btn fab @click="$root.signOut()">
                <v-icon>mdi-account-off-outline</v-icon>
            </v-btn>
            </v-speed-dial>
        </v-app-bar>

        <v-content>
            <div v-if="!$store.state.user">
                <login></login>
            </div>

            <div v-else>
                <myList v-if="$store.state.list"></myList>
            </div>
        </v-content>
    </v-app>
</template>

<script>
    import login from './components/login';
    import myList from './components/myList'

    export default {
        name: 'App',
        components: {
            login, myList
        },
        data: () => ({
            fabOpen: false
        }),
    };
</script>
