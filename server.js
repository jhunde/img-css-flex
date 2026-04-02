import express from "express";
import dotenv from "dotenv";
// const express = require("express");
// const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const UNSPLASH_API_KEY = process.env.API_KEY;

if (!UNSPLASH_API_KEY){
    console.log("Missing API KEY! \t It was not found.");
    process.exit(1);
}

app.use(express.static("public"));

/*Get 15 random photos from Unsplash*/
app.get("/api/photos", async(req, res) => {
    try{
        const count = 15;
        // const url = `https://api.unsplash/photos/random?count=${count}`;
        const url = `https://api.unsplash.com/photos/random?count=${count}`;

        const respone = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                "Accept-Version": "v1",
            },
        });

        if (!respone.ok){
            const errorText = await respone.text();
            return res.status(respone.status).send(errorText);
        }

        const data = await respone.json();

        const photos = data.map((photo) => ({
            id: photo.id,
            alt: photo.alt_description, 
            image: photo.urls.small,
            link: photo.links.html,
        }));

        res.json(photos);
    }
    catch(error){
        console.error("Error fetching Unsplash: ", error);
        res.status(500).json({error: "Server error"});
    }
});

app.get("/api/test", (req, res) => {
    res.json({ok: true});
});

app.listen(PORT, () => {
    console.log(`server running at http:/localhost:${PORT}`);
})