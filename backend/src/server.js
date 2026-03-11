//const express = require("express");
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { Ratelimit } from "@upstash/ratelimit";
import ratelimit from "./config/upstash.js";

import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); // middleware to parse json bodies
app.use(rateLimiter);

// app.use((req,res,next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at PORT:", PORT);
  });
});
