<template>
    <div class="elevation-2 mt-4 mx-1">
        <v-simple-table>
            <transition-group name="list" tag="tbody">
                <tr v-for="(item, index) in $store.state.list.items" :key="item.name" class="cell" :class="{isInCart: item.isInCart}" @click="toggleFromCart(index)">
                    <td>{{ item.name }}</td>
                    <td>{{ item.qte }}</td>
                </tr>
            </transition-group>
        </v-simple-table>
    </div>
</template>

<script>

    module.exports = {
        data: function () {
            return {

            }
        },
        methods: {
            toggleFromCart(i) {
                this.$store.commit('toggleItem',i);
                this.$root.saveDb();
            }
        }
    }
</script>

<style lang="scss" >

    .cell {
        background-color: white;
        transition: all .3s;
    }
    .isInCart {
        background-color: lightgray !important;
        td {
            opacity: .5;
        }
    }
    .list-move {
        transition: all .3s;
    }
</style>
