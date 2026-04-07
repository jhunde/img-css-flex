async function fetchimage(){
    const grid = document.getElementById("grid");
    grid.textContent = "Loading...";

    try{
        const res = await fetch("/api/photos");
        if (!res.ok) throw new Error(`HTTP error! Status; ${res.status}`);

        // Testing if API works 
        const data = await res.json();
        console.log(data);
        const photos = Array.isArray(data) ? data : [data];
        console.log(photos[0]);

        // Print data retrieved from api 
        grid.innerHTML = photos.map(photo => {
            // Load image to the front page
            const media = 
                photo.media_type === "image" 
                    ? `<img src="${photo.image} alt="${photo.alt}" style="max-width:600px;">` 
                    : `<a href="${photo.links}" target="_blank" rel="noreference">Open media</a>`;

                    return `
                        <div class="items> 
                            ${media}
                        </div>
                    `;

        }).join("");

    }catch(error){
        console.log(`Error: ${error}`);
        grid.textContent = "Failed to load random photos from Unsplash!";
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    fetchimage();
});