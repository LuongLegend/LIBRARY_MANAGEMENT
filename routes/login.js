const router = require('express').Router();
const user   = require('../service/models/user');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
router.post('/',async (req,res) =>{
    let {username,password} = req.body;
    if(!username || !password){
        res.json({msg: "do u miss something (password or username)"});
    }
    let User = await user.findOne({username: username});
    if(!User){
        res.json({msg: "cannot find this user"});
    } else{
        console.log(password);
       // console.log(User);
        console.log(User.password);
        let verifyPassword = await bcrypt.compare(password,User.password);
        console.log(verifyPassword);
        if(!verifyPassword) res.status(401).json({msg: "incorrect password"});
        else {
            token = jwt.sign({sub: User.id},process.env.SECRET_OR_KEY,{expiresIn:'1d'});
            res.json({token});
        }
    }
});

module.exports = router;