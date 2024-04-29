import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db";

export const register = (req: express.Request, res: express.Response) => {
  // check existing user
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("User already exists!");

    // encrypt password and create username
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      hash,
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};


export const login = (req: express.Request, res: express.Response) => {
  // Implement login logic here
};

export const logout = (req: express.Request, res: express.Response) => {
  // Implement logout logic here
};
