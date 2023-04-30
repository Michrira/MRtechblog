// Import necessary modules and models
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Import data from JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// Define an asynchronous function to seed the database
const seedDatabase = async () => {
  // Sync all models and drop all tables if they exist
  await sequelize.sync({ force: true });

  // Create users with hashed passwords using individual hooks
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create posts and associate them with users
  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  // Create comments and associate them with users and posts
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  // Exit the process when the seeding is complete
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
