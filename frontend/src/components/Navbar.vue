<template>
    <div id="app" class="navbar navbar-dark bg-dark">
        <div class="container" v-if="currentUser">
            <router-link to="/profile" class="navbar-brand ">
                <div class="enter-font" size="4">
                    {{ currentUser.name }}
                </div>
            </router-link>
            <router-link to="/usertasks" class="navbar-brand ">
                Задачи
            </router-link>
            <a href @click.prevent="logOut" class="navbar-brand ">
                Выйти
            </a>
        </div>
        <div class="row justify-content-end" v-else>
            <router-link to="/login" class="navbar-brand col-6">
                Войти
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {};
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>

<style>
.item {
    margin-right: 5px;
}
</style>