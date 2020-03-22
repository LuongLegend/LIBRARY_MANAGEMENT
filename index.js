const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT  || 3333;
require('dotenv').config();
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//routes
app.use('/login',require('./routes/login'));
app.use('/user',require('./routes/user'));
app.use('/book',require('./routes/book'));
//app.use('/author',require('./routes/author'));
// app.get('/',passport.authenticate('jwt',{session:false}), (req,res) => {
//     res.json({msg: "sever is working"});
// });

 app.listen(PORT, () => console.log(`sever is listening PORT : ${PORT}`));