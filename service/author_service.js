const { author, book } = require('../service/models/index');
const { Op } = require('sequelize');
module.exports = function (options) {
    this.add('role:author,cmd:addAuthor', addAuthor);
    this.add('role:author,cmd:updateAuthor', updateAuthor);
    this.add('role:author,cmd:getAnAuthor', getAnAuthor);
    this.add('role:author,cmd:findAuthor', findAuthor);
    this.add('role:author,cmd:getAll', getAll);
    async function addAuthor(msg, reply) {
        let { data } = msg;
        try {
            let result = await author.create(data);
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function updateAuthor(msg, reply) {
        let { data, id } = msg;
        try {
            let result = await author.update(data, {
                where: {
                    id: id
                }
            });
            reply(null, { msg: 'updated successfully!' });
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function getAnAuthor(msg, reply) {
        let { id } = msg;
        try {
            let result = await author.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: book,
                    attributes: ['title', 'isbn', 'status', 'description',]
                }]
            });
            if (!result) reply({ mgs: 'this author is not exist' });
            else
                reply(null, result)
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function findAuthor(msg, reply) {
        try {
            let { data } = msg;
            let { q, page } = data;
            let limit = 20;
            let offset = 0;
            if (parseInt(page) > 1) offset = limit*(parseInt(page)-1);
            let result = await author.findAll({
                where: {
                    name: {
                        [Op.substring]: q
                    }
                },
                limit: limit,
                offset: offset
            });
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function getAll(msg, reply){
        try{
            let result = await author.findAll({
                limit: 20,
            });
            reply(null, result);
        }catch(err){
            console.log(err);
            reply(err);
        }
    }

}