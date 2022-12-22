
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
        sessionStorage.setItem('user', JSON.stringify(res.data));
        window.location.reload();
    })
    .catch((err)=> console.log(err));

const signUp = (body) => axios.post(`${baseUrl}/api/signUp`, body)
    .then((res)=> {
        console.log('hit signUp')
        sessionStorage.setItem('user', JSON.stringify(res.data));
        window.location.reload();
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
// const button = document.querySelector('#submit-btn')

// var button = e.relatedTarget;
// formTitle.textContent = button.textContent;

// formTitle.textContent.trim() === 'Login' ? (optionalMsg.style.display = 'none') : (optionalMsg.style.display = 'block');


authSubmit.addEventListener('click', (e)=> {

    e.preventDefault();
    const body = {email: email.value, password:password.value};
    console.log(authSubmit.textContent)
    authSubmit.textContent.trim() === 'Login' ? handleAuth("Login" , body) : handleAuth("SignUp", body);
    email.value = ''
    password.value = ''
})