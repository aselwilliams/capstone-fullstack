
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
        // sessionStorage.setItem('user', JSON.stringify(res.data));
        // window.location.reload();
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
        // if(res.data==='Email is already in use, try login'){
        //     alert('Email is already in use, please login.')
        // } else {
        //     alert("Account created successfully");
        // }
        // sessionStorage.setItem('user', JSON.stringify(res.data));
        // window.location.reload();
        let token = await res.data.token;
        console.log(res.data);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", res.data.user_id);
        window.location.href = './login.html'
    })
    .catch((err)=> console.log(err));

    const handleAuth = (authType, body) => {
        authType === 'SignUp' ? signUp(body) : login(body);
    }

const email = document.querySelector('#email')
const password = document.querySelector('#password')
const authSubmit = document.querySelector('#submit-btn')
const optionalMsg = document.querySelector('#optional-msg')
const formTitle = document.querySelector('#form-title')


authSubmit.addEventListener('click', (e)=> {

    e.preventDefault();
    let emailValue = email.value;
    let passwordValue = password.value;
    if(emailValue !== "" && passwordValue !== ""){
        const body = {email: email.value, password:password.value};
        console.log(authSubmit.textContent)
        authSubmit.textContent.trim() === 'Login' ? handleAuth("Login", body) : handleAuth("SignUp", body);
    }
        email.value = ''
        password.value = ''
})

// ---------Checkout starts------------
const checkoutBtn = document.querySelector("#checkout-btn");

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
