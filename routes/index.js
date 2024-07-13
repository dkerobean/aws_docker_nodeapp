const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home page - list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.render('pages/home', { posts });
  } catch (err) {
    console.error(err);
    res.render('pages/home', { posts: [] });
  }
});

// New post form
router.get('/posts/new', (req, res) => {
  res.render('pages/new_post', { post: null });
});

// Create new post
router.post('/posts', async (req, res) => {
  const { title, body } = req.body;
  try {
    await Post.create({ title, body });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/posts/new');
  }
});

// Edit post form
router.get('/posts/edit/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('pages/edit_post', { post });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Update post
router.post('/posts/edit/:id', async (req, res) => {
  const { title, body } = req.body;
  try {
    await Post.findByIdAndUpdate(req.params.id, { title, body });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete post
router.post('/posts/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// View post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('pages/post', { post });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
