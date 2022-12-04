var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force:false});

app.listen(3000);
var user = require('./app/route/user.route.js');
user(app);
var user_task=require('./app/route/user_task.route.js');
user_task(app);