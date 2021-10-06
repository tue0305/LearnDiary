const express = require(`express`);
const router = express.Router();
const Post = require(`../models/Post`);
const verifyToken = require(`../middleware/auth`);

// @route GET api/posts
// @desc Get post
// @acess Private
router.get(`/`, verifyToken, async (req, res) => {
  // simple validation
  try {
    const posts = await Post.find({ user: req.userId }).populate(`user`, [
      `username`,
    ]);

    res.json({ success: true, posts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @acess Private
router.delete(`/:id`, verifyToken, async (req, res) => {
  // simple validation
  try {
    const postDeleteConditions = { _id: req.params.id, user: req.userId };
    deletedPost = await Post.findOneAndDelete(postDeleteConditions);

    // User not authorized to delete or post not found
    if (!deletedPost) {
      return res.status(401).json({ success: false, message: ` User not authorized to delete or post not found! ` });
    }
    res.json({
      success: true,
      message: `Post delete successfully!`,
      post: deletedPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route PUT api/posts
// @desc Put post
// @acess Private
router.put(`/:id`, verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // simple validation
  if (!title) {
    return res.status(400).json({ success: false, message: `Missing title!` });
  }
  try {
    // check existing user
    let updatedPost = {
      title,
      description: description || ``,
      url:  (url.startsWith("https://") ? url : `https://${url}`) ||``,
      status: status || `TO LEARN`,
    };

    const postUpdateConditions = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateConditions,
      updatedPost,
      { new: true }
    );
    
    // User not authorized to update or post not found
    if (!updatedPost) {
      return res.status(401).json({ success: false, message: ` User not authorized to update or post not found! ` });
    }

    res.json({
      success: true,
      message: `Post update successfully!`,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route POST api/posts
// @desc Create post
// @acess Private
router.post(`/`, verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // simple validation
  if (!title) {
    return res.status(400).json({ success: false, message: `Missing title!` });
  }
  try {
    // check existing user
    var newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || `TO LEARN`,
      user: req.userId,
    });

    await newPost.save();

    res.json({
      success: true,
      message: `Post created successfully!`,
      post: newPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

module.exports = router;
