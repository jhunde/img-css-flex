import express from "express";
import dotenv from dotenv;

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
app.get(" ", async(req, res) => {
    try{
        const count = 15;
        const url = `https://api.unsplash/photos/random?count=${count}`;

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
            image: photo.url.small,
            link: photo.links.html,
        }));

        res.json(photos);
    }
    catch(error){
        console.error("Error fetching Unsplash: ", error);
        res.status(500).json({error: "Server error"})
    }
});

app.listen(PORT, () => {
    console.log(`server running at http:/localhost:${PORT}`);
})