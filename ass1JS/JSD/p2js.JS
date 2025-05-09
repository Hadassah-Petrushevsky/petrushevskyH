const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgArr = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

/* Declaring the alternative text for each image file */
const imgAlts = [
    {altText: "Photo 1 - Human Eye"},
    {altText: "Photo 2 - Sky"},
    {altText: "Photo 3 - Purple Flowers"},
    {altText: "Photo 4 - Egypt Script"},
    {altText: "Photo 5 - Butterfly"}
];

/* Looping through images */
for (let i = 0; i < imgArr.length; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `imagesp2/${imgArr[i]}`);
    newImage.setAttribute('alt', imgAlts[i].altText);
    thumbBar.appendChild(newImage);
}

/* Set the src and alt attributes on the large image when a thumbnail is clicked */
thumbBar.addEventListener("click", (event) => {
    displayedImage.setAttribute('src', event.target.getAttribute('src'));
    displayedImage.setAttribute('alt', event.target.getAttribute('alt'));
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    if (btn.getAttribute("class") === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
});