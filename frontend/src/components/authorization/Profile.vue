<template>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{ currentUser.name }}</strong>
            </h3>
        </header>
        <p>
            <strong>Логин:</strong>
            {{ currentUser.username }}
        </p>
        <button class="btn btn-danger" v-on:click="deleteUser">Удалить аккаунт</button>
    </div>
</template>
<script>
import http from "../../http-common";
export default {
    
    name: 'ProfileUser',
    data() {
        return {
            tasks: [],
            displayContent: false
        };
    },
    computed: {
        currentUser() {

            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }

    },
    methods:{
        deleteUser() {
            http
                .post("/deleteUser/" +this.$store.state.auth.user.id)
                .then(data=>{
                    this.$store.dispatch('auth/logout');
                    window.location.href = '/login';
                    console.log(data)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
};
</script>