
import express from "express";
import { bookRouter } from "./Routes/bookie_routes.js";
import mongoose from "mongoose";
import "dotenv/config"
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 7070;

const mongo_URL = process.env.MONGO_URL

// Move this BEFORE your routes
app.use(express.json());
app.use(cors())
app.use ("/api/v1", bookRouter);

// Now register your routes
// app.use(bookRouter);

await mongoose.connect(mongo_URL);

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})