var checkoutBtn = document.querySelector("#checkout-btn");

console.log(document.referrer,'history')

// if(document.referrer=='http://127.0.0.1:5501/Client/index.html'){
//   checkoutBtn.style.display='none'
//   console.log('hit history')
// } 
let cartArr=JSON.parse(localStorage.getItem('cart'))
if(!cartArr.length){
  checkoutBtn.style.display='none'
  console.log('hit history')
}
//waving the labels
const labels = document.querySelectorAll(".form-control label");
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => `<span style="transition-delay:${idx * 100}ms">${letter}</span>`)
    .join("");
});

const baseUrl = 'http://localhost:8080'

const login = (body) => axios.post(`${baseUrl}/api/login`, body)
    .then((res)=> {
        console.log('hit login')
  
      console.log(res.data)
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.user_id);

        window.location.href = './menu.html'
    })
    .catch((err)=> console.log(err));

const signUp = (body) => axios.post(`${baseUrl}/api/signUp`, body)
    .then( async(res)=> {
        console.log('hit signUp')
      
        let token = await res.data.token;
        console.log(res.data);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", res.data.user_id);
        window.location.href = './login.html'
    })
    .catch((err)=> console.log(err));

    const handleAuth = (authType, body) => {
      if(body.email!=='' && body.password!==''){
        authType === 'SignUp' ? signUp(body) : login(body);
      } else {
        alert('Please, fill out all fields.')
      }
    }

const email = document.querySelector('#email')
const password = document.querySelector('#password')
const address = document.querySelector('#address')
const city = document.querySelector('#city')
const state = document.querySelector('#state')
const zipcode = document.querySelector('#zipcode')
const authSubmit = document.querySelector('#submit-btn')
const optionalMsg = document.querySelector('#optional-msg')
const formTitle = document.querySelector('#form-title')

authSubmit.addEventListener('click', (e)=> {
    e.preventDefault();
 
        console.log(authSubmit.textContent)
        if(authSubmit.textContent.trim() === 'Login') {
          const loginBody = {
            email: email.value, 
            password:password.value
          };
          handleAuth("Login", loginBody)
        } else {
          const signUpBody = {
            email: email.value, 
            password: password.value,
            address: address.value,
            city: city.value,
            state: state.value,
            zipcode: zipcode.value
          };
          handleAuth("SignUp", signUpBody);
        } 
        email.value = ''
        password.value = ''
        address.value = ''
        city.value = ''
        state.value = ''
        zipcode.value = ''
})

// ---------Checkout starts------------

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
    })
    .catch((e) => {
      console.error(e.error);
    });
});
