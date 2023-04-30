// Import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// Create associations between the models

// User-Post relationship
User.hasMany(Post, {
    foreignKey: 'user_id'  // foreign key on the `Post` model that points to the `User` model's primary key
});

// Post-User relationship
Post.belongsTo(User, {
    foreignKey: 'user_id' // foreign key on the `Post` model that points to the `User` model's primary key
});

// Comment-User relationship
Comment.belongsTo(User, {
    foreignKey: 'user_id', // foreign key on the `Comment` model that points to the `User` model's primary key
    onDelete: 'cascade',  // if a user is deleted, all their associated comments will be deleted as well
    hooks: true           // enable hooks for this association
});

// Comment-Post relationship
Comment.belongsTo(Post, {
    foreignKey: 'post_id', // foreign key on the `Comment` model that points to the `Post` model's primary key
    onDelete: 'cascade',   // if a post is deleted, all its associated comments will be deleted as well
    hooks: true            // enable hooks for this association
});

// User-Comment relationship
User.hasMany(Comment, {
    foreignKey: 'user_id', // foreign key on the `Comment` model that points to the `User` model's primary key
    onDelete: 'cascade',   // if a user is deleted, all their associated comments will be deleted as well
    hooks: true            // enable hooks for this association
});

// Post-Comment relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id', // foreign key on the `Comment` model that points to the `Post` model's primary key
    onDelete: 'cascade',   // if a post is deleted, all its associated comments will be deleted as well
    hooks: true            // enable hooks for this association
});

// Export the modules
module.exports = {
    User,
    Post,
    Comment
};
