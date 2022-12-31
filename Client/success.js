
localStorage.clear()

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector(".search-input");

searchBtn.onclick = () => {
  searchInput.classList.toggle("show");
};