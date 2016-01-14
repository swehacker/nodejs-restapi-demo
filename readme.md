# NodeJS Rest API Demo
This is a 10 minutes demo on how to set up a simple restapi using [NodeJS] and [MongoDB] and some modules.
* We will use [MongoDB] for storing our products and [mongoose] module to allow our app talk to the database and use object modeling.
* For web framework we will use [Express] which is light, fast, and very easy to use.
* We will use [node-restful] for quickly providing data-api
* And [body-parser] middleware to handle json bodies.

If you don't have a rest-client for testing the api I can recommend Postman application for Google Chrome.

## Prereq.
* NodeJS and NPM Installed.
* MongoDB installed and running.

## Lets get started
Lets start creating the project and setting up the modules for express and mongoose

```bash
mkdir nodejs-rest-demo
npm init
npm install --save express
npm install --save mongoose

```

#### Lets see if express is working
var express = require('express');
var app = express();

app.get('/', function(req, res) {
   res.send('hello'); 
});

app.listen(3000);

console.log("App is listening on port 3000");

#### Setup the data-api and body-parser modules
Install node-restful and body-parser modules, and save them in our project file.
```bash
npm install --save node-restful body-parser
```

Configure them in the server.js
```
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/demo');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

#### Create the Product model
Create a directory and call it models and add a new file called product.js.

./models/product.js
```javascript
var restful = require('node-restful');
var mongoose = restful.mongoose;

var productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

module.exports = restful.model('Products', productSchema);
```

#### Create a new route
File: ./server.js
```
app.use('/api/v1', require('./routes/api'));
```

Make a simple route so we can test it.

File: ./routes/api.js
```
var express = require('express');
var router = express.Router();

router.get('/products', function(req, res) {
   res.send('Router is working');
});

module.exports = router;
```

Let's test it out by go to the url [http://localhost:3000/api/v1/products](http://localhost:3000/api/v1/products) in your browser
You should see the text "Router is working".

#### Connect the middleware to the router
So we now know that the new route is working, now we can connect them together.

```javascript
var express = require('express');
var router = express.Router();

var Product = require('../models/product');

Product.methods(['get', 'post', 'put', 'delete']);
Product.register(router, '/products');

module.exports = router;
```

Now you should be able to add, remove, update and get products by using the url: [http://localhost:3000/api/v1/products](http://localhost:3000/api/v1/products)

* Get: http://localhost:3000/api/v1/products retrieve all products.
* Post: http://localhost:3000/api/v1/products creates a new product.
* Put: http://localhost:3000/api/v1/products/:id change a product.
* delete: http://localhost:3000/api/v1/products/:id remove a product.

If we do a get we should now see
```
[]
```

If we do a post with a body like this
```
{ 
  "name": "Milk",
  "price": 12
}
```

and we do a new get we should see somthing like this
```
[
    {
        "_id": "569770c1a75eab53127eb126",
        "name": "Milk",
        "price": 12,
        "__v": 0
    }
]
```

The _id is the id you can use to update or delete the product.

## Pro Tip
#### Autoreload your changes with nodemon
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm.

```npm install -g nodemon```

Just use nodemon instead of node to run your code, and now your process will automatically restart when your code changes.

[NodeJS]: https://nodejs.org/ "NodeJS"
[MongoDB]: https://www.mongodb.org/ "MongoDB"
[mongoose]: http://mongoosejs.com/ "mongoose"
[nodemon]: http://nodemon.io/ "nodemon"
[express]: http://expressjs.com/ "Express"
[node-restful]: http://benaugarten.com/node-restful/ "node-restful"
[body-parser]: https://github.com/expressjs/body-parser "body-parser"

