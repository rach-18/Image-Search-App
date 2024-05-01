const apiKey = "RAeetatMjKYsgoDKd_7aJOLe4NAF1V0XLmdEmm4t-hc";

// const formEl = document.querySelector("form");
const searchBtn = document.getElementById("search-btn");
const inputEl = document.getElementById("search-image");
const results = document.querySelector(".results");
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = inputEl.value;
    const apiUrl = `https://api.unsplash.com/search/photos?pages=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const searchResults = data.results;

    if(page === 1) {
        results.innerHTML = "";
    }

    searchResults.map((res) => {
        const imageWrap = document.createElement("div");
        imageWrap.classList.add("result");
        const image = document.createElement("img");
        image.src = res.urls.small;
        image.alt = res.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
        imageLink.innerHTML = res.alt_description;

        imageWrap.appendChild(image);
        imageWrap.appendChild(imageLink);
        results.appendChild(imageWrap);
    });

    page++;

    if(page > 1) {
        showMoreBtn.style.display = "block";
    }
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    searchImage();
});
