// app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const Blog = require('./models/blog');
const setupMiddleware = require('./middleware/middleware');

const app = express();

mongoose.connect(config.database.url)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

setupMiddleware(app);

app.get("/", (req, res) => {
  res.redirect("/add-blog");
});

app.get("/show-blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.render('show_blogs', { allBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/add-blog', (req, res) => {
  res.render("add_item");
});

app.post('/add-blog', async (req, res) => {
  try {
    const { fname, lname, email, title, image1, image2, content } = req.body;
    const isDataStored = await Blog.create({
      name: `${fname} ${lname}`,
      email,
      photo: [image1, image2],
      text: content,
      title,
    });

    if (!isDataStored) {
      console.log('Error storing data');
    }

    console.log('Data stored successfully');
    res.redirect("/show-blogs");
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/read-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Blog.findById(id);
    res.render('read_blogs', { item });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/delete-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Blog.findByIdAndDelete(id);

    if (!deleteItem) {
      console.log('Item not deleted');
    }

    console.log('Item deleted');
    res.redirect("/show-blogs");
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = config.server.port;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
