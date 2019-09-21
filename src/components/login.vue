<template>
    <div>
        <v-card max-width="344" class="mx-auto mt-5">
            <v-card-text v-if="!$root.isLoading">
                <v-form ref="form" v-model="valid">
                    <v-text-field label="email" :rules="emailRules" v-model="email" required></v-text-field>
                    <v-text-field label="password" :rules="passRules" v-model="password" required></v-text-field>
                </v-form>

                <v-btn block text @click="logIn">Me connecter</v-btn>
                <p class="text-center font-italic">ou</p>
                <v-btn block text @click="singIn">Créer un compte</v-btn>
            </v-card-text>

            <v-card-text v-else class="d-flex justify-center">
                <v-progress-circular indeterminate class="ma-12"></v-progress-circular>
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
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
            ],
            passRules: [
                v => !!v || 'Un mot de passe est requis',
            ],
            valid: true,
        }
    },
    methods: {
        isFormValid() {
            return this.$refs.form.validate();
        },
        logIn: function() {
            if (this.isFormValid()) {
                this.$root.logIn(this.email, this.password);
            }
        },
        singIn: function() {
            if (this.isFormValid()){
                this.$root.signIn(this.email, this.password);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
