
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

const baseURL =`http://13.58.38.0/api/products`;

const productCallback = ({data: products}) => displayProducts(products);
const errCallback = err =>console.log(err.response.data)

const getAllProducts = () => axios.get(baseURL).then(productCallback).catch(errCallback)

menuLink.addEventListener('click', getAllProducts);

//newsletter
let formEl = document.querySelector('.newsletter-form');
let subBtn = document.querySelector('#sub-btn')

// const createSubscription = (body) => axios.post('http://localhost:8080/api/subscribers', {body}).then(res=>console.log(res.data)).catch(err=> console.log(err));

function handleSubmit(e) {
    e.preventDefault();
    console.log('handlesubmit')

    let name = document.querySelector('#name');
    let email = document.querySelector('#email');

    let newSub = {
        name: name.value,
        email: email.value
    }
    axios.post('http://13.58.38.0/api/subscribers', newSub).then(res=>console.log(res.data)).catch(err=> console.log(err));
    // createSubscription(newSub)
    alert('Thank you for your subscription!')
    name.value = ''
    email.value = ''
}
subBtn.addEventListener('click',handleSubmit)
formEl.addEventListener('submit', handleSubmit)