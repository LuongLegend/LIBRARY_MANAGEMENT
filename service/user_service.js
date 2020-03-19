const user = require('../service/models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = function (options) {
    this.add('role:user,cmd:getAll',getAll);
    this.add('role:user,cmd:getOne',getOne);
    this.add('role:user,cmd:addUser',addUser);
    this.add('role:user,cmd:updateUser',updateUser);
    this.add('role:user,cmd:blockUser',blockUser);

    async function getAll(msg,reply){
        try{
            let result = await user.findAll({
                exclude: ['password','block_message','block_time','create_time','create_by']
            });
            reply(null,result);
        }catch(err){
            console.log(err);
            reply(err);
        }
    }

    async function getOne(msg,reply){
        try{
            let userId = msg.userId;
            let result = await user.findOne({
                exclude: ['password','block_message','block_time','create_time','create_by'],
                where: {
                    id: userId
                }
            })
            if(!result) reply({msg: "cannot find this user"});
            else {
                reply(null,result);
            }
        }catch(err){
            console.log(err);
            reply(err.message);
        }
    }

    async function addUser(msg,reply){
        try{
            let {data} = msg;
            console.log(data);
            if(!data.password) {
                res.json({msg : "password cannot be empty"});
                return ;
            }
            let hashedPassword = await bcrypt.hash(password,saltRounds); 
            data['password'] = hashedPassword;
            try{
                let User = await user.create(data);
                reply(null,User);
            }catch(err){
                reply(err);
            }
        }catch(err){
            console.log(err);
            reply(err.message);
        }
    }
    async function updateUser(msg,reply) {
        let {userId} = msg;
        try{
            let User = await user.findOne({
                where: {
                    id: userId
                }
            });
            if(!User) reply({msg: "cannot find this user"});
            else{
            let {username,fullname,email,status} = {data} = msg || User;
            console.log(data);
                try{
                    let result = await user.update(data,{
                        where: {
                            id: userId
                        }
                    });
                    reply(null,{msg: 'updated'});
                }catch(err){
                    console.log(err);
                    reply(err);
                }
            }
        }catch(err){
            reply(err.message);
    }};

    async function blockUser(msg,reply) {
        try{
            let {userId} = msg;
            let {block_message,block_time} = msg.data;
            let status = -1;
            let result = await user.update({block_message,block_time,status},{
                where: {
                    id: userId
                }
            });
            reply({msg: "blocked this user",result});
        }catch(err){
            console.log(err);
            reply(err);
        }    
    }
}