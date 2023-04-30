const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Post model schema
Post.init({
    id: {
        type: DataTypes.INTEGER,
       /*  allowNull: false, */
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
     /*    allowNull: false, */
        validate: {
            len: [1]
        }
    },
    content: {
        type: DataTypes.STRING,
    /*     allowNull: false, */
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',   // Foreign key to the User model
            key: 'id'
        }
    }
}, {
    sequelize,          // Connect to the database
    freezeTableName: true,   // Don't pluralize the table name
    underscored: true,      // Use snake_case instead of camelCase for field names
    modelName: 'post'       // Use the name 'post' for the model in Sequelize
})


module.exports = Post;  // Export the Post model for use in other modules
