<template>
    <div>
        <v-card max-width="344" class="mx-auto mt-5">
            <v-card-text>
                <v-text-field label="email" v-model="email"></v-text-field>
                <v-text-field label="password" v-model="password"></v-text-field>
                <v-btn block text @click="logIn">Me connecter</v-btn>
                <p class="text-center font-italic">ou</p>
                <v-btn block text @click="singIn">Créer un compte</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

module.exports = {
    data: function () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        logIn: function() {
            this.$root.logIn(this.email, this.password);
        },
        singIn: function() {
            this.$root.signIn(this.email, this.password);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
