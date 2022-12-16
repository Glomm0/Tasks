<template>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{currentUser.name}}</strong>
            </h3>
        </header>
        <p>
            <strong>Логин:</strong>
            {{currentUser.username}}
        </p>
    </div>
    
</template>
<script>
//import http from "../../http-common";
    export default {
        name: 'ProfileUser',
        data() { // данные компонента (определение переменных)
            return {
                tasks: [],
                displayContent: false // по умолчанию скрываем контент
            };
        },
        computed: {
            currentUser() {
                //console.log(this.$store.state.auth.user)
                return this.$store.state.auth.user;
            }
        },
        methods: { // методы компонента
            
            
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            
        }
    };
</script>