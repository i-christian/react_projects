import { addPost } from "../controllers/post";
import express from "express";

const router = express.Router();

router.get("/tests", addPost);


export default router;
