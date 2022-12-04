var db = require('../config/db.config.js');
var UserTask = db.user_task;
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');
// Получение всех пользователей
exports.findAll = (req, res) => {
    UserTask.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
exports.create = (req, res) => {
    UserTask.create({
        user_id: req.body.user_id,
        is_done: 0,
        name: req.body.name,
        task_date: req.body.task_date
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
exports.update = (req, res) => {
    UserTask.update({
        user_id: req.body.user_id,
        is_done: req.body.is_done,
        name: req.body.name,
        task_date: req.body.task_date
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
exports.delete = (req, res) => {
    UserTask.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
exports.UserTasksForPeriod = (req, res) => {
    console.log(req)
    UserTask.findAll({
        
        where: {
            task_date: {
                [Op.and]: {
                    [Op.gte]: req.params.begin_date,
                    [Op.lte]: req.params.end_date
                }
            },
            user_id : {[Op.eq]:req.params.user_id}
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};