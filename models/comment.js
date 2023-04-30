const { DataTypes } = require('sequelize'); // Importing the DataTypes object from sequelize
const sequelize = require('../config/connection'); // Importing the connection object from the connection module

// Defining the Comment model
const Comment = sequelize.define('comment', {
    // Defining the 'id' field
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // Defining the 'comment_text' field
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    // Defining the 'user_id' field and adding a foreign key constraint to the 'User' model
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    // Defining the 'post_id' field and adding a foreign key constraint to the 'Post' model
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    freezeTableName: true, // Setting the 'freezeTableName' option to true to prevent sequelize from automatically pluralizing the table name
    underscored: true // Setting the 'underscored' option to true to use underscores instead of camel-casing for field names
});

module.exports = Comment; // Exporting the Comment model
