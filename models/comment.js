const { Model, DataTypes } = require('sequelize'); // Importing Model and DataTypes from Sequelize
const sequelize = require('../config/connection'); // Importing the connection to the database from config/connection.js

class Comment extends Model {} // Creating a Comment class that extends the Sequelize Model class

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user', // References the user model
            key: 'id' // The primary key of the user model
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post', // References the post model
            key: 'id' // The primary key of the post model
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment' // Sets the model name to 'comment'
});

module.exports = Comment; // Exports the Comment model for use in other files
