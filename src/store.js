import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        list: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        deleteUser(state) {
            state.user = null;
            state.list = null;
        },
        setList(state, list) {
            state.list = list;
        },
        toggleItem(state, index) {
            let list = state.list;
            list.toggleItem(index);
            state.list = list;
        },
        purgeItems(state) {
            let list = state.list;
            list.deleteInCartItem();
            state.list = list;
        }
    },
    actions: {}
})
