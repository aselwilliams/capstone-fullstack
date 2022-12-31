require("dotenv").config();
const bcrypt = require('bcryptjs');
const express = require("express");
const cors = require("cors");
const {seed, getAllProducts, deleteProduct, editProduct, createProduct, createCustomOrder, createSubscription} = require('./controller')
const {userLogin, userSignup} = require('./authController')

const app = express();
const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(express.json());
app.use(cors(corsOptions));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post('/api/seed', seed)

app.get('/api/products', getAllProducts)

// app.delete('/api/products/:id', deleteProduct);

// app.post('/api/products/:id', createProduct)

// app.put('/api/products/:id', editProduct)

app.post('/api/orders', createCustomOrder)

app.post('/api/subscribers', createSubscription)
let cart=require('./db.json')

app.post('/api/login', userLogin)

app.post('/api/signUp', userSignup)

app.post("/create-checkout-session", async(req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items:
        req.body.items.map((item) => {
        let index=cart.findIndex(el=> el.id===item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: cart[index].title,
                description: cart[index].category,
                images: [cart[index].img]
              },
              unit_amount: +((cart[index].price * 100).toFixed(2)),
            },
            quantity: item.quantity,
          };
        }),
        // automatic_tax: {
        //     'enabled': true,
        // },
        success_url: `http://127.0.0.1:5501/Client/success.html`,
        cancel_url: `${process.env.PUBLIC_URL}/cancel.html`,
      });
      res.json({ url: session.url});
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


const SERVER_PORT = 8080
app.listen(SERVER_PORT, ()=>console.log(`Server is running on port ${SERVER_PORT}`));