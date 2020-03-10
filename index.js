const express = require('express');
const app = express();
const PORT = process.env.PORT  || 3333;
const author = require('./service/models/author')
const user_permission = require('./service/models/user_permission')
require('dotenv').config();
app.get('/', (req,res) => {
    res.json({msg: "sever is working"});
});

 app.listen(PORT, () => console.log(`sever is listening PORT : ${PORT}`));