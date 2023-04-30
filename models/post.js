const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1], // ensure that the title is not empty
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1], // ensure that the content is not empty
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // reference the User model
                key: 'id', // use the 'id' column of the User model
            },
        },
    },
    {
        sequelize,
        modelName: 'post',
        timestamps: true, // automatically manage createdAt and updatedAt fields
        createdAt: 'created_at', // customize the name of the createdAt field
        updatedAt: 'updated_at', // customize the name of the updatedAt field
        underscored: true, // use snake_case naming convention for the columns
    }
);

module.exports = Post;
