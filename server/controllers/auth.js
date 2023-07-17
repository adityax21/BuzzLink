import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
//async as we contact backend
//req - request from frontend , res : response
export const register = async (req, res) => {
  try {
    //data from req body extracted 
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //generate salt for password hashing
    const salt = await bcrypt.genSalt();
    //hash password using salt
    const passwordHash = await bcrypt.hash(password, salt);

    //data for new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    //save new user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//the login function
/* LOGGING IN */
export const login = async  (req, res) => {
  try {
    //extract email and password
    const { email, password } = req.body;
    //find user in database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    //if user is found - match passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    //assign jwt token : has user id if password correct 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //delete user password from the user object
    delete user.password;
    //send a json object with the token and the user
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
