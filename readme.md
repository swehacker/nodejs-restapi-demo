# NodeJS Rest API Demo w. MongoDB
This is a 10 minutes demo on how to set up a simple restapi using NodeJS and MongoDB and some modules.

## Prereq.
* NodeJS and NPM Installed
* MongoDB
* Text editor

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

#### Add rest and mongo modules
npm install --save node-restful body-parser

Configure them in the server.js
```
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rest_demo');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

#### Create a model
New File: ./models/product.js

```
var restful = require('node-restful');
var mongoose = resful.mongoose;

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

Let's test it out http://localhost:3000/api/v1/products

#### Connect the model to the route



#### nodemon (not req.)
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm.

```npm install -g nodemon```

Just use nodemon instead of node to run your code, and now your process will automatically restart when your code changes.

[http://nodemon.io/]


