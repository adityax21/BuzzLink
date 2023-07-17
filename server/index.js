import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */ //config setup for an express app
const __filename = fileURLToPath(import.meta.url);
//filename and dirname get current file's direct path
const __dirname = path.dirname(__filename);
dotenv.config(); //load environment variables - API keys
const app = express(); //instance of express app
app.use(express.json()); //use json coming from requests
app.use(helmet()); //helmet adds http headers to improve security
//allow cross origin access to resources
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //log http req to console
//parse json data from requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
//parse url encoded data
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //allows webpage to request resources on a diff web page
//serve static files from direc when url path starts with /assets
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  //define how files will be stored on disk
  //takes object with two func - dest and filename
  destination: function (req, file, cb) {
    cb(null, "public/assets"); 
    //determine dest for uploaded files
    //cb is callback when error
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //find filename of uploaded file
  },
});
//create instance of multer using storage defined above
const upload = multer({ storage });


/* ROUTES WITH FILES */
//registration process - picture to be uploaded - available in req.file in register route handler 
app.post("/auth/register", upload.single("picture"), register);
//creation of posts - picture in create post object
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
//PORT is set to PORT from .env else 6001
const PORT = process.env.PORT || 6001;
mongoose
//connect to mongoose using url
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //connection string parsed correctly
    useUnifiedTopology: true,
  })
  //promise callback function - when connection successful
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
     //User.insertMany(users);
     //Post.insertMany(posts);
  })
  //connection fails
  .catch((error) => console.log(`${error} did not connect`));
  