import express from "express";
import auth from "../../middleware/auth.js";
import Profile from "../../Models/Profile.js";
import User from "../../Models/User.js";
import Posts from "../../Models/Posts.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route GET api/posts
// @desc Test route
// @access public

router.post(
  "/",
  [auth, [check("text", "Text field cannot be empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const { text } = req.body;
      const newPost = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Posts(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Server error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  await Posts.findMany({user: req.user.id})
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "NOT AUTHORIZED" });
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(400).send("server error");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.likes.filter((e) => e.user.toString() === req.user.id).length > 0)
      return res.status(400).json({ msg: "User has already liked the post" });
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (
      post.likes.filter((e) => e.user.toString() === req.user.id).length === 0
    )
      return res.status(400).json({ msg: "You have not liked the post!" });
    const index = post.likes
      .filter((e) => e.user.toString() === req.user.id)
      .indexOf();
    post.likes.splice(index);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/comments/:id",
  [auth, [check("text", "Text field cannot be empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Posts.findById(req.params.id);
      const { text } = req.body;
      const newComment = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Server error");
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const post = await Posts.findById(req.params.id);
    const comment = await post.comments.find(
      (e) => e.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    

    if (req.user.id !== comment.user.toString())
      return res.status(401).json({ msg: "Not authorized" });
    const index = post.comments.map((e) => e.id === req.params.comment_id);
    post.comments.splice(index, 1);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server error");
  }
});
export default router;
