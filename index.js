import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app = express();
app.use(cors());

app.use(morgan("tiny"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);
app.use("/", (req, res) => {
  res.send("Hello to memories API");
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port with MongoDB: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
