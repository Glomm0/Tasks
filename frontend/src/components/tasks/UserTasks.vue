<template>
    <div class="text-center">
        <div  v-if="displayContent">
            <h4>Список Задач</h4>
            <div class="row">
                <div class="col-8">
                <!--Календарь с выбором периода-->
                <Datepicker v-model="date"
                    range
                    multiCalendars
                    autoApply
                    locale="ru"/>
                </div>
                <div class="col-4">
                <button v-on:click="getTasksForPeriod()" class="btn btn-info">Подтвердить период</button>
            </div>
            </div>
            <!-- Определение ссылок -->
            
            <div class="container">
                
                <ul class="list-group">
                    <!-- Вывод списка пользователей -->
                    <li class="list-group-item" v-for="task in this.tasks" :key="task">
                        <p class="task">{{task.name}}</p> <p>Дата назначения: {{task.task_date}}</p>  {{task.is_done ? "✅":"❌"}}
                        <div class="row justify-content-end">
                            
                        <div class="col-4">
                            <button v-if="!task.is_done" v-on:click="updateTask(task)" class="btn btn-secondary">Завершить задачу</button>
                            <button v-else v-on:click="updateTask(task)" class="btn btn-secondary">Сделать незаверешнной</button>
                           </div>
                           <div class="col-4">
                            <button v-on:click="deleteTask(task.id)" class="btn btn-danger">Удалить</button>
                        </div>
                        </div>
                    </li>
                </ul>
            </div>
                Сделано задач за период: {{info[0]}}; не сделано: {{info[1]}}
                <div>
                <router-link class="btn btn-primary" to="/addTask">Добавить Задачу</router-link>
            </div>
        </div>
        <div v-else>
            Контент доступен только авторизованным пользователям
        </div>
        
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import moment from 'moment'
    moment.locale('ru');
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    import UserService from '../../services/user.service';
    import { ref, onMounted } from 'vue';
    import '@vuepic/vue-datepicker/dist/main.css'
    export default {
        components: {
             Datepicker
        },
        setup() { // Установка календаря (по документации)
            const date = ref();


            onMounted(() => {
                const endDate = new Date();
                const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
                date.value = [startDate, endDate];
            });
            return {
                date
            }
        },
        name: "UserTasks", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                currentUser:this.$store.state.auth.user,
                begin_date: new Date(),
                end_date: new Date(),
                info:[0,0],
                tasks: [],
                displayContent: false // по умолчанию скрываем контент
            };
        },
        methods: { // методы компонента
            getTasks() {
                http
                    .get("/tasks") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.tasks = response.data;
                        this.info=[0,0]
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            deleteTask(id){
                
                http
                    .post("/deleteUserTask/" + id)
                    .then(() => {
                        this.getTasks()
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateTask(task){
                task.is_done= task.is_done==1? 0:1;
                http
                    .post("/updateUserTask/"+task.id,task)
                    .then(()=>{this.updateInfo()})
            },
            getInfo(){
                http
                    .get("")
            },
            updateInfo(){
                this.info=[0,0]
                this.tasks.forEach(element => {
                            if (element.is_done==0){this.info[1]++}
                            else{this.info[0]++}
                        });
            }
            ,
            getTasksForPeriod() {
                var begin_date = moment(this.date[0]).format("YYYY-MM-DD");
                var end_date = moment(this.date[1]).format("YYYY-MM-DD");
                http
                    .get("/UserTasksForPeriod/userId=" + this.currentUser.id + "/beginDate=" + begin_date + "/endDate=" + end_date)
                    .then(response => {
                        this.tasks = response.data;
                        this.updateInfo()
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            UserService.getUserBoard()
                .then(() => {
                    this.displayContent = true;
                })
                .catch(e => {
                        this.content =
                            (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    }
                );
            this.getTasksForPeriod();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
    .task{
        font-size: 200%;
    }
</style>