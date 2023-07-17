import Post from "../models/Post.js";
import User from "../models/User.js";

//Creating Post
//function is async as it communicates with backend
export const createPost = async (req, res) => {
  try {
    //extract from req body
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId); //find user
    const newPost = new Post({ //new instance of the post
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); //save to database

    const post = await Post.find(); //retrieve all posts
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//Reading the post - FEED
export const getFeedPosts = async (req, res) => {
  try {
    //get all posts
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Read posts - USER SPEC
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    //with matching user id
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Update the Post
export const likePost = async (req, res) => {
  try {
    //get id and user id
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};  