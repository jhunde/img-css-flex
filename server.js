import express from "express";
import dotenv from dotenv;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const UNSPLASH_API_KEY = process.env.API_KEY;

if (!UNSPLASH_API_KEY){
    console.log("Missing API KEY! \t It was not found.")
    process.exit(1);
}
