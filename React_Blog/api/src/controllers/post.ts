import express from "express";


export const addPost = (req: express.Request, res: express.Response) => {
  res.json("from controller");
}
