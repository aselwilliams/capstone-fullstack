// header  hamburger btn toggle
let navbar = document.querySelector(".navbar");
let menuBtn = document.querySelector("#menu-btn");
let menuContainer = document.querySelector(".menu-container");
const btnContainer = document.querySelector(".btn-container");

menuBtn.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

//CRUD operations
const baseURL =`http://localhost:8080/api/products`;

var products=[]
// const productCallback = ({data: cartArr}) => {
//     renderCartItems(cartArr)
//     renderSubtotal(cartArr)};
const errCallback = err =>console.log(err)

const getAllProducts = () => axios.get(baseURL).then(({data: productsArr})=> {
    products = productsArr
    renderItems(products)
    renderBtns()
}).catch(errCallback)
// const createProduct = (id) => axios.post(`${baseURL}/${id}`).then(productCallback).catch(errCallback)
// const deleteProduct = (id) => axios.delete(`${baseURL}/${id}`).then(productCallback).catch(errCallback)
// const editProduct = (id, action) => axios.put(`${baseURL}/${id}`, {action}).then(productCallback).catch(errCallback)


//populating the cards


window.addEventListener("DOMContentLoaded", function () {
    getAllProducts()
});

function renderItems(products) {
  let menuItem = products.map((item) => {
    // let { img, title, price, id } = item;
    let itemStr=JSON.stringify(item)
    // console.log(itemStr)
    return `
  <article class='menu-item'>
                <div class="img-wrapper">
                    <img src=${item.img} alt=${item.title}>
                </div>
                <div class="content">
                    <p class='title'>${item.title}</p>
                    <div class="flex">
                        <p class='title price'>$${item.price.toFixed(2)}</p>
                        <a class='add-btn' onclick='addToCart(${itemStr})' href="#">Add</a>
                    </div>
                </div>
            </article>`;
  });
  menuItem = menuItem.join("");
  menuContainer.innerHTML = menuItem;
}

//populating category Btns function
function renderBtns() {
  const categories = products.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map((category) => {
      return `<button class='filter-btn' value='${category}'>${category}</button>`;
    })
    .join("");
  btnContainer.innerHTML = categoryBtns;

  const filterBtns = document.querySelectorAll(".filter-btn");

  //filter btns eventlistener
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.target.value;
      console.log(e.target.value, "currentTarget");

      const menuCategory = products.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        renderItems(products);
      } else {
        renderItems(menuCategory);
      }
    });
  });
}

//display input and search functionality
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector(".search-input");

searchBtn.onclick = () => {
  searchInput.classList.toggle("show");
};

searchInput.addEventListener("input", function (event) {
  const name = event.target.value;
  console.log(products,'in search', name)
  const filteredData = products.filter((item) => {
    return item.title.toLowerCase().includes(name);
  });
  renderItems(filteredData);
});

//testimonials

const data = [
  {
    id: 3,
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Cindie LaForce",
    review:
      "Wow! I got my Strawberry Cheesecake on short notice and it was amazing! My entire family loved it. It is, hands down, one of the best cheesecakes I’ve ever had. Thank you so much!",
  },
  {
    id: 1,
    src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Kevin Johnson",
    review:
      "I love the friendliness and amazing service that I receive at Baking Art. I have my pastry basket shipped to job my job, always arrives on time and never disappointed. Thank you for making my work days sweet.",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Bella Hogan",
    review:
      "What an incredibly creative cake we had at our sons graduation party! We couldn’t believe the detail and effort put into making it unique for my son. Definitely one of a kind. Nikki is very professional, fun, and I will always go back!!! Thank you for making our first custom cake order a fantastic one!",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Susan Smith",
    review:
      "I highly recommend Baking Art for custom cakes that are aesthetically pleasing as well as delicious. I ordered a custom Lemon Rosemary cake for my birthday on really short notice (about a 5 days before my bday). Baking art was the only bakery willing to take my order and they did an amazing job.",
  },
];
const authorImg = document.querySelector("#author-img");
const author = document.querySelector("#author");
const review = document.querySelector("#review");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const randomBtn = document.querySelector("#random-btn");

let currentItem = 0;
window.addEventListener("DOMContentLoaded", function () {
  displayReview(currentItem);
});

function displayReview() {
  const item = data[currentItem];
  authorImg.src = item.src;
  author.textContent = item.name;
  review.textContent = item.review;
}

nextBtn.addEventListener("click", () => {
  currentItem++;
  if (currentItem > data.length - 1) {
    currentItem = 0;
  }
  displayReview();
});

prevBtn.addEventListener("click", () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = data.length - 1;
  }
  displayReview();
});

randomBtn.addEventListener("click", () => {
  currentItem = Math.floor(Math.random() * data.length);
  displayReview();
});
