import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";
import UserTasks from "./components/tasks/UserTasks";
import AddTask from "./components/tasks/AddTask"
// определяем маршруты
const routes = [
    
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя"
        }
    },
    {
        path: "/usertasks",
        name: "user-tasks",
        component: UserTasks,
        meta: {
            title: "Задачи пользователя"
        }
    },
    {path: "/addTask",
    name: "addtasks",
    component: AddTask,
    meta: {
        title: "Задачи пользователя"
    }}

    
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;