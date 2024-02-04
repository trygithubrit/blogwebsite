// blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: [String, String],  // Assuming 2 image links
  text: String,
  title: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
