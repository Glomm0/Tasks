<template>
    <div class="container">
        <div class="text-center" v-if="!submitted">
            <h4>Добавление Задачи</h4>
            <form @submit="addTask">
                <input class="form-control" type="text" name="name" id="name" placeholder="Название" required v-model="task.name">
                <input class="form-control" type="date" name="date" required v-model="task.date">
                <input class="btn btn-primary" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div>
                <button class="btn btn-success" v-on:click="newTask">Добавить новую задачу</button>
            </div>
            <div>
                <router-link class="btn btn-secondary" to="/usertasks">Вернуться к списку задач</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddTask",
        data() {
            return {
                task: {
                    name: "",
                    task_date: "01/01/1970", 
                    user_id: this.$store.state.auth.user.id
                },
                submitted: false
            };
        },
        methods: {
            addTask(e) {
                e.preventDefault();
                var data = {
                    user_id:this.$store.state.auth.user.id,
                    name: this.task.name,
                    task_date: this.task.date
                    
                };
                http
                    .post("/addUserTask", data)
                    .then(response => {
                        this.task.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newTask() {
                this.submitted = false;
                this.task = {
                    name: "",
                    task_date: "01/01/1970", 
                    user_id: this.$store.state.auth.user.id
                };
            }
        }
    }
</script>