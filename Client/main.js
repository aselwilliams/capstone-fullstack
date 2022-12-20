// header
let navbar = document.querySelector('.navbar');
let menu = document.querySelector('#menu-btn');

menu.onclick= () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}
// Cart starts
const cartBtn = document.querySelector("#cart-btn");
const cartElement = document.querySelector(".cart");
const cartContainer = document.querySelector("#cart-container");
const closeBtn = document.querySelector(".cart-close");

cartBtn.onclick = () => {
    cartContainer.classList.add("show");
  };
  
  closeBtn.onclick = () => {
    cartContainer.classList.remove("show");
  };

// Scroll animation starts
  const observer = new IntersectionObserver((entries)=> {
    entries.forEach((entry)=> {
        // console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add('unhidden');
        } else {
            entry.target.classList.remove('unhidden');
        }
    })
  })

  const hiddenElements = document.querySelectorAll('.hidden')
  hiddenElements.forEach((el)=> observer.observe(el));

  //GSAP type animation
let cursor =gsap.to('.cursor', {opacity:0, ease:"power2.inOut", repeat:-1});

  let masterTl = gsap.timeline()

let words = ["One bite and you will overrule"]

  words.forEach((word)=> {
    let tl = gsap.timeline({ repeatDelay:1})
    tl.to('.type-text1', {duration:2, text:word, onComplete: ()=> masterTl2.play()})
    masterTl.add(tl)
  })
  let masterTl2 = gsap.timeline().pause()

let words2 = ["all objections"]

  words2.forEach((word)=> {
    let tl = gsap.timeline({ repeatDelay:1})
    tl.to('.type-text2', {duration:3, text:word})
    masterTl2.add(tl)
  })
//get all products
const menuLink = document.querySelector('#menu-link');

const baseURL =`http://localhost:8080/api/products`;

const productCallback = ({data: products}) => displayProducts(products);
const errCallback = err =>console.log(err.response.data)

const getAllProducts = () => axios.get(baseURL).then(productCallback).catch(errCallback)

menuLink.addEventListener('click', getAllProducts);

//newsletter
let formEl = document.querySelector('.newsletter-form');

const createSubscription = (body) => axios.post('http://localhost:8080/api/subscribers', {body}).then(res=>console.log(res.data)).catch(err=> console.log(err));

function handleSubmit(e) {
    e.preventDefault();

    let name = document.querySelector('#name');
    let email = document.querySelector('#email');

    let newSub = {
        name: name.value,
        email: email.value
    }
    // axios.post('http://localhost:8080/api/subscribers', newSub).then(res=>console.log(res.data)).catch(err=> console.log(err));
    createSubscription(newSub)
    alert('Thank you for your subscription!')
    name.value = ''
    email.value = ''
}

formEl.addEventListener('submit', handleSubmit)