import express from "express";
import postRoutes from "./routes/posts";
import authRoutes from "./routes/users";
import userRoutes from "./routes/users";


const app = express();

app.use(express.json());
app.use("/api/posts/", postRoutes);
app.use("/api/users", useRoutes);
app.use("/api/auth", authRoutes);


app.listen(8800, () => {
  console.log("connected")
})
