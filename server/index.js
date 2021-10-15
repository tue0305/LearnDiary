require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const authRouter = require(`./routes/auth`);
const postRouter = require(`./routes/post`);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@LearnDiary.v3xyw.mongodb.net/LearnDiary?retryWrites=true&w=majority`,
      {
        
      }
    );
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors()) // To parse the incoming requests with JSON payloads

// ### Using routes
app.use(`/api/auth`, authRouter);
app.use(`/api/posts`, postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
