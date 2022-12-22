// cart starts
const cartBtn = document.querySelector("#cart-btn");
const cartElement = document.querySelector(".cart");
const cartContainer = document.querySelector("#cart-container");
const closeBtn = document.querySelector(".cart-close");
const subtotal = document.querySelector('.cart-total');
const cartItemCount = document.querySelector('.cart-item-count');

cartBtn.onclick = () => {
  cartContainer.classList.add("show");
  renderCartItems(JSON.parse(localStorage.getItem('cart')))
  renderSubtotal()
};

closeBtn.onclick = () => {
  cartContainer.classList.remove("show");
};
//Adding to Cart
const addBtn = document.querySelector(".add-btn");

let cartArr=[]

function addToCart(item) {
  cartArr=JSON.parse(localStorage.getItem('cart')) || []
  console.log(cartArr, 'cartArr')
  console.log(item.product_id,'itemid')
  if(cartArr.length===0){
    cartArr.push(item);
    console.log(cartArr, 'cartArr')
  } 
  else {
    let x=cartArr.filter((el)=>el.product_id===item.product_id)
    console.log(x,'x')
    if(x.length===0){
      cartArr.push(item);
    } else {
      changeItemCount(item.product_id, 'plus')
    alert('Product already in the cart')
    } 
  } 
  localStorage.setItem('cart', JSON.stringify(cartArr))
  console.log(JSON.parse(localStorage.getItem('cart')),'localstorage')
  updateCart()
}
//Update cart
function updateCart() {
cartArr = JSON.parse(localStorage.getItem('cart'))

  renderCartItems(cartArr)
  renderSubtotal()
}

//calculate and render Subtotal
function renderSubtotal(){
cartArr = JSON.parse(localStorage.getItem('cart'))

    let totalPrice = 0;
    let totalItems = 0;

    cartArr.forEach((item)=> {
        totalPrice += (+item.price) * (+item.count)
        totalItems += +item.count;
        console.log(totalPrice,'totalPrice')
    })
    subtotal.innerHTML =`Subtotal : $${totalPrice.toFixed(2)}`
    cartItemCount.innerHTML = `${totalItems}`
    cartItemCount.style.padding = "0.2rem 0.7rem";
}

function renderCartItems(cartArr) {
  let newCartItem = cartArr.map((item) => {
    return  `
          <article
            class="cart-item"
            data-id="rec8kkCmSiMkbkiko"
          >
            <img
              src=${item.img}
              class="cart-item-img"
              alt=${item.title}
            />
            <div>
              <h4 class="cart-item-name">${item.title}</h4>
              <p class="cart-item-price">${item.price}</p>
              <button
                class="cart-item-remove-btn"
                onclick="removeFromCart(${item.product_id})"
              >
                remove
              </button>
            </div>
    
            <div>
              <button
                class="cart-item-increase-btn"
                onclick="changeItemCount(${item.product_id}, 'plus')"
              >
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" >
                ${item.count}
              </p>
              <button
                class="cart-item-decrease-btn"
                onclick ="changeItemCount(${item.product_id}, 'minus')"
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </article>`
  });
  document.querySelector(".cart-items").innerHTML = newCartItem
}
function removeFromCart(id){
    cartArr = JSON.parse(localStorage.getItem('cart'))
    let index= cartArr.findIndex((el)=>el.id===id)
    cartArr.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartArr))
    updateCart()
}

  function changeItemCount(id, action){
    console.log(id, action,'id action')
    cartArr = JSON.parse(localStorage.getItem('cart'))
    console.log(cartArr,'cartArr')
    let index=cartArr.findIndex(el=>el.product_id===id)
    if(action==='plus'){
      cartArr[index].count++
    } else if(action==='minus' && cartArr[index].count>1) {
      cartArr[index].count--
    }
    localStorage.setItem('cart', JSON.stringify(cartArr))
    updateCart()
}

// ---------Checkout starts------------
const checkoutBtn = document.querySelector(".cart-checkout");

checkoutBtn.addEventListener("click", () => {
  cartArr = JSON.parse(localStorage.getItem('cart'))
  
  fetch("http://localhost:8080/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: 
      cartArr.map((el)=>{
        return {
          id:+el.product_id, 
          quantity:+el.count,
          images:[el.img]
        }
      }),
   
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url
      localStorage.clear()
    })
    .catch((e) => {
      console.error(e.error);
    });
});
