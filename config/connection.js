// Import the Sequelize library
const Sequelize = require('sequelize');

// Load the environment variables from the .env file
require('dotenv').config();

let sequelize;

// If the JAWSDB_URL environment variable exists, use it to connect to the database
if (process.env.JAWSDB_URL) {
sequelize = new Sequelize(process.env.JAWSDB_URL);
}
// Otherwise, use the environment variables to connect to the database
else {
sequelize = new Sequelize(
process.env.DB_NAME, // database name
process.env.DB_USER, // database user
process.env.DB_PASSWORD, // database password
{
host: 'localhost', // database host
dialect: 'mysql', // database dialect
port: 3306 // database port
}
);
}

// Export the connection object
module.exports = sequelize;