module.exports = (sequelize, Sequelize) => {
    var UserTask = sequelize.define(
        'user_task', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            is_done: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name:{
                type: Sequelize.STRING(50),
                allowNull:false
            },
            task_date:{
                type: Sequelize.DATEONLY,
                allowNull: false
            }
        });

    // Определяем связи таблицы user_category с другими таблицами
    UserTask.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        UserTask.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        
    };
    return UserTask;
};