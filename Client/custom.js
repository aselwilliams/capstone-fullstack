
const orderForm = document.querySelector('form');
emailjs.init('uPnmQwpK5dNLijMcd');

const baseURL = 'http://localhost:8080/api/orders';

const createCustomOrder = (body) => axios.post(baseURL, body).then(res=>console.log(res.data)).catch(err=> console.log(err));

function handleSubmit(e) {
    e.preventDefault();

    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let hear = document.querySelector('input[name="hear"]:checked');
    let repeated = document.querySelector('input[name="repeated"]:checked');
    let icing = document.querySelector('input[name="icing"]:checked');
    let link = document.querySelector('#link');
    let guests = document.querySelector('#guests');
    let flavor = document.querySelector('#flavor');
    let color = document.querySelector('#color');
    let date = document.querySelector('#date');
    let time = document.querySelector('#time');
    let details = document.querySelector('#details');

    var newOrder = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        hear: hear.value,
        repeated: repeated.value,
        icing: icing.value,
        link: link.value,
        guests: guests.value,
        flavor: flavor.value,
        color: color.value,
        date: date.value,
        time: time.value,
        details: details.value
    }
    createCustomOrder(newOrder);
    const serviceId = 'service_sovq3qk';
    const templateId = 'template_z71yimf';
    emailjs.send(serviceId, templateId, newOrder).then(res=>{
    console.log(res) 
    alert('Your message sent successfully!')}).catch(err=>console.log(err))

        name.value = ''
        email.value = ''
        phone.value = ''
        hear.value = ''
        repeated.value = ''
        icing.value = ''
        link.value = ''
        guests.value = ''
        flavor.value = ''
        color.value = ''
        date.value = ''
        time.value = ''
        details.value = ''
}


orderForm.addEventListener('submit', handleSubmit)