const year = new Date().getFullYear();

const yearById = document.getElementById("year");
if (yearById) {
    yearById.textContent = year;
}

document.querySelectorAll(".footer .year").forEach((el) => {
    el.textContent = year;
});

const rating = document.getElementById("rating");
const ratingValue = document.getElementById("rating-value");
if (rating && ratingValue) {
    ratingValue.textContent = rating.value + "%";
    rating.addEventListener("input", () => {
        ratingValue.textContent = rating.value + "%";
    });
}
