// Define a function named formatDate that takes a date parameter
function formatDate(date) {
  // Convert the date parameter to a Date object and format the date string as 'MM/DD/YYYY'
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
  ).getFullYear()}`;
}

// Export the formatDate function to be used in other modules
module.exports = {
  formatDate
}
