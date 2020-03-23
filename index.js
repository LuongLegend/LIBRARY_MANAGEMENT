const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3333;
require('dotenv').config();
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//authentication middleware
app.use(require('./middleware/authenticate'))
//routes
app.use('/login', require('./routes/login'));
app.use('/user', require('./routes/user'));
app.use('/book', require('./routes/book'));
app.use('/author', require('./routes/author'));
app.use('/catalog', require('./routes/catalog'));
app.use('/user_permission', require('./routes/user_permission'));

app.listen(PORT, () => console.log(`sever is listening PORT : ${PORT}`));