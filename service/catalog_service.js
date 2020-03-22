const { catalog, book } = require('./models/index');
const {Op} = require('sequelize');
module.exports = function (options) {
    this.add('role:catalog,cmd:addCatalog', addCatalog);
    this.add('role:catalog,cmd:updateCatalog', updateCatalog);
    this.add('role:catalog,cmd:deleteCatalog', deleteCatalog);
    this.add('role:catalog,cmd:getAcatalog', getAcatalog);
    this.add('role:catalog,cmd:getAll', getAll);
    this.add('role:catalog,cmd:findCatalog', findCatalog);
    async function addCatalog(msg, reply) {
        try {
            let { data } = msg;
            let result = catalog.create(data);
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function updateCatalog(msg, reply) {
        try {
            let { data, id } = msg;
            let result = await catalog.update(data, {
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

    async function deleteCatalog(msg, reply) {
        try {
            let { id } = msg;
            let result = await catalog.destroy({
                where: {
                    id: id
                }
            });
            reply(null, { msg: `deleted catalog: ${id}` });
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function getAcatalog(msg, reply) {
        try {
            let { id } = msg;
            let result = await catalog.findOne({
                where: {
                    id: id
                },
                include: {
                    model: book,
                    attributes: ['title', 'isbn', 'status', 'description']
                }
            });
            if (!result) reply({ msg: 'can\'t not find this catalog' });
            else
                reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function getAll(msg, reply) {
        try {
            let result = await catalog.findAll({
                attributes: ['id','name', 'alias'],
                limit: 20
            });
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function findCatalog(msg, reply) {
        try {
            let { data } = msg;
            let { q, page } = data;
            let limit = 20;
            let offset = 0;
            if (parseInt(page) > 1) offset = limit*(parseInt(page)-1);
            let result = await catalog.findAll({
                where: {
                    name: {
                        [Op.substring]: q
                    }
                },
                attributes: ['id','name','alias'],
                limit: limit,
                offset: offset
            });
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

}