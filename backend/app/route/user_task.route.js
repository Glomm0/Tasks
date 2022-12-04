module.exports = (app) => {

    const user_task = require('../controller/user_task.controller');
    
  
    app.get('/api/tasks', user_task.findAll);
    // Добавление пользователя
app.post('/api/addUserTask', user_task.create);

// Обновление данных пользователя по id
app.post('/api/updateUserTask/:id', user_task.update);

// Удаление данных пользователя по id
app.post('/api/deleteUserTask/:id', user_task.delete);
app.get("/api/UserTasksForPeriod/userId=:user_id/beginDate=:begin_date/endDate=:end_date",user_task.UserTasksForPeriod);

};