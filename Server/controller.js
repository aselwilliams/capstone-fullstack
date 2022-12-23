const Sequelize = require('sequelize');
require('dotenv').config();
const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res)=> {
        sequelize.query(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS orders;

            CREATE TABLE products (
                product_id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                category VARCHAR(50),
                price FLOAT,
                count INTEGER,
                img TEXT
            );
            
            CREATE TABLE users(
                user_id serial primary key,
                email varchar not null,
                passhash varchar(500) not null 
            );

            CREATE TABLE subscribers (
                subscriber_id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(100)
            );

            CREATE TABLE orders (
                order_id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(100),
                phone VARCHAR(50),
                hear VARCHAR(50),
                repeated VARCHAR(50),
                icing VARCHAR(50),
                link TEXT,
                guests VARCHAR(50),
                flavor VARCHAR(50),
                color VARCHAR(50),
                date VARCHAR(100),
                time VARCHAR(50),
                details TEXT
            );

            INSERT INTO products (title, category, price, count, img)
            VALUES ( 'rainbow cake', 'cakes', 30.00, 1, './../Assets/balloon-cake.jpeg'),
            ('matcha tea cake', 'cakes', 30.00, 1, './../Assets/matcha-cake.jpeg'),
            ('chocolate mousse cake', 'cakes', 29.00, 1, 'http://gillesmarchal.com/wp-content/uploads/2016/10/gato_21_@2x.png'),
            ('sourdough bread', 'breads', 7.99, 1, './../Assets/bread.jpeg'),
            ('coffee cupcake', 'cupcakes', 3.00, 1, './../Assets/coffee-cupcake.jpeg'),
            ('french croissants', 'pastry', 2.79, 1, './../Assets/croissant.png'),
            ('strawberry fraisier', 'mini desserts', 3.99, 1, 'https://gillesmarchal.com/wp-content/uploads/2022/05/070522_022のコピー.jpg'),
            ('mango burst', 'mini desserts', 3.79, 1, 'https://gillesmarchal.com/wp-content/uploads/2020/09/TYO4495.jpg'),
            ('raspberry mille feuille', 'mini desserts', 2.99, 1, 'https://gillesmarchal.com/wp-content/uploads/2022/05/070522_008のコピー.jpg'),
            ('strawberry tart', 'mini desserts', 3.45, 1, 'https://gillesmarchal.com/wp-content/uploads/2022/05/070522_013%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC.jpg'),
            ('carrot cake', 'cakes', 28.50, 1, 'https://stevenbaker.de/wp-content/uploads/2020/07/steven-baker-produkt-cake-carrot-cake-806x596.jpg' ),
            ('coconut cake', 'cakes', 29.00, 1, 'https://stevenbaker.de/wp-content/uploads/2020/07/steven-baker-produkt-cake-carrot-cake-806x596.jpg'),
            ('raspberry cake', 'mini desserts', 4.15, 1, 'https://dinarakasko.com/wp-content/uploads/2017/10/dinara-kasko-molds-470x470.jpg'),
            ('cherry cake', 'cakes', 29.50, 1, 'https://dinarakasko.com/wp-content/uploads/2017/07/cherry-cake-470x470.jpg'),
            ('almond heart cake', 'cakes', 33.00, 1, 'https://dinarakasko.com/wp-content/uploads/2017/02/heart-cake-470x470.jpg'),
            ('chocolate block', 'cakes',33.00, 1, 'https://dinarakasko.com/wp-content/uploads/2016/12/block-470x470.jpg'),
            ('strawberry coconut cake', 'cakes', 34.00, 1, 'https://dinarakasko.com/wp-content/uploads/2016/12/cake-strawberry-coconut-header-470x470.jpg'),
            ('whole-wheat bread','breads',5.50, 1, 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sourdough-bread-horizontal-466-1548048509.jpg?crop=1xw:0.9995002498750624xh;center,top&resize=480:*' ),
            ('multi-grain bread', 'breads', 6.50, 1, 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/types-of-bread-multigrain-1666288726.jpg'),
            ('cinnamon roll', 'pastry', 3.00, 1, 'https://i.ebayimg.com/images/g/wBQAAOSwRgJXlqtc/s-l500.jpg'),
            ('red velvet cupcake', 'cupcakes', 3.30, 1, 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
            ('chocolate hazelnut cupcake', 'cupcakes', 3.50, 1, 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
            ('chocolate mint cupcake', 'cupcakes', 3.00, 1, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGN1cGNha2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'),
            ('apple danish', 'pastry', 2.5, 1, 'https://media.gettyimages.com/id/157290015/photo/danish-pastry-on-white-background.jpg?s=612x612&w=0&k=20&c=xxXeqkljqD3MvArnwcD7L6-E9u87yXEzJGSU6Owf2iM=');
        `)
        .then(() => {
            console.log('DB seeded successfully!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
        getAllProducts: (req, res)=> {
            sequelize.query(`
            SELECT * FROM products;
            `)
            .then((dbRes) => {
                res.status(200).send(dbRes[0])
             }).catch(err => console.log(err))
    },
    createCustomOrder: (req, res)=> {
        console.log(req.body, 'body obj')
        const {name, email, phone, hear, repeated, icing, link, guests, flavor, color, date, time, details} = req.body;
        sequelize.query(`
        INSERT INTO orders (name, email, phone, hear, repeated, icing, link, guests, flavor, color, date, time, details)
        VALUES ('${name}', '${email}', '${phone}', '${hear}', '${repeated}', '${icing}', '${link}', '${guests}', '${flavor}', '${color}','${date}', '${time}', '${details}');
        `)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err)=> console.log(err))
    },
    createSubscription: (req, res)=> {
        const {name, email} = req.body;
        sequelize.query(`
        INSERT INTO subscribers (name, email)
        VALUES ('${name}', '${email}');
        `)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err)=> console.log(err))
    }

}





// const products = require('./db.json');
// let globalId = 20;
// let cartArr =[];
// let customOrderArr = [];
// let orderId = 1;

// module.exports = {
//     getAllProducts: (req, res)=> {
//         res.status(200).send(products)
//     },
//     // deleteProduct: (req, res)=> {
//     //     let {id} = req.params;
//     //     let index = cartArr.findIndex(item => item.id === +id)
//     //     if(index===-1){
//     //         res.status(400).send('Product not found')
//     //     } else {
//     //         cartArr.splice(index, 1)
//     //         res.status(200).send(cartArr)
//     //     }
//     // },
//     // editProduct: (req, res)=> {
//     //     let {id} = req.params;
//     //     let {action} = req.body;
//     //     let index = cartArr.findIndex(item => item.id === +id)
//     //     if(index === -1){
//     //         res.status(400).send('Product not found')
//     //     } else if(action === 'plus'){
//     //         cartArr[index].count++;
//     //         res.status(200).send(cartArr)
//     //     } else if (action === 'minus' && cartArr[index].count > 1){
//     //         cartArr[index].count--;
//     //         res.status(200).send(cartArr)
//     //     } else {
//     //         res.sendStatus(400)
//     //     }
//     // },
//     // createProduct: (req, res)=> {
//     //     let {id}= req.params;
//     //     let foundItem = products.find((el)=> el.id===+id)
//     //     // const {title, category, price, img} = req.body;
//     //     // let newProduct = {
//     //     //     id:globalId,
//     //     //     title,
//     //     //     category,
//     //     //     price,
//     //     //     img
//     //     // }
//     //     cartArr.push(foundItem)
//     //     res.status(200).send(cartArr)
//     //     // globalId++;
//     // },
//     // getCartArray: (req,res)=> {
//     //     res.status(200).send(cartArr)
//     // },
//     createCustomOrder: (req, res)=> {
//         const {name, email, phone, hear, repeated, icing, link, guests, flavor, color, date, time, details} = req.body;
//         let newOrder = {
//             id: orderId,
//             name,
//             email,
//             phone,
//             hear,
//             repeated,
//             icing,
//             link,
//             guests,
//             flavor,
//             color,
//             date,
//             time,
//             details
//         }
//         customOrderArr.push(newOrder);
//         res.status(200).send(customOrderArr);
//         orderId++;
//     }
// }