const router = require('express').Router();
const {user}   = require('../service/models/index');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
router.post('/',async (req,res) =>{
    try{
        let {username,password} = req.body;
        if(!username || !password){
            res.json({msg: "do u miss something (password or username)"});
        }
        let User = await user.findOne({
            where: {
                username: username
            }
        });
        if(!User){
            res.json({msg: "cannot find this user"});
        } else{
            let verifyPassword = await bcrypt.compare(password,User.password);
            if(!verifyPassword) res.json({msg: "incorrect password"});
            else {
                console.log(User);
                token = jwt.sign({sub: User.id},process.env.SECRET_OR_KEY,{expiresIn:'1d'});
                res.json({token});
            }
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err.message);
    }
});

module.exports = router;