const { book, author, catalog } = require('./models/index');
const { Op, Sequelize } = require('sequelize');
module.exports = function (options) {
    this.add('role:book,cmd:getAll', getAll);
    this.add('role:book,cmd:findBook', findBook);
    this.add('role:book,cmd:addBook', addBook);
    this.add('role:book,cmd:updateBook', updateBook);
    this.add('role:book,cmd:deleteBook', deleteBook);
    this.add('role:book,cmd:checkBook', checkBook);
    this.add('role:book,cmd:getAbook', getAbook);

    async function getAll(msg, reply) {
        try {
            let result = await book.findAll({
                attributes: ['id', 'author_id', 'catalog_id', 'title', 'isbn', 'status', 'description'],
                limit: 20
            });
            reply(null, result);
        } catch (err) {
            reply(err);
        }
    };

    async function findBook(msg, reply) {
        try {
            let { data } = msg;
            let { q, page } = data;
            let limit = 20;
            let offset = 0;
            if (parseInt(page) > 1) offset = limit * (parseInt(page) - 1);
            let result = book.findAll({
                attributes: ['id', 'author_id', 'catalog_id', 'title', 'isbn', 'status', 'description'],
                limit: limit,
                offset: offset,
                where: {
                    [Op.or]: [
                        {
                            title: {
                                [Op.substring]: q
                            }
                        }, {
                            isbn: {
                                [Op.substring]: q
                            }
                        }, {
                            description: {
                                [Op.substring]: q
                            }
                        }, {
                            '$author.name$': {
                                [Op.substring]: q
                            }
                        }
                    ]
                },
                include: [{
                    model: author,
                    attributes: ['name', 'description'],
                }, {
                    model: catalog,
                    attributes: ['name', 'alias']
                }],
            })
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    };

    async function getAbook(msg, reply) {
        try {
            let { id } = msg;
            let result = await book.findOne({
                attributes: ['id', 'author_id', 'catalog_id', 'title', 'isbn', 
                'status', 'description','create_by','create_time','approved_time','approved_by'],
                include: [{
                    model: author,
                    attributes: ['name', 'description']
                }, {
                    model: catalog,
                    attributes: ['name', 'alias']
                }],
                where: {
                    [Op.or]: [{
                        id: id
                    },{ 
                        isbn: id
                    }]
                }
            });
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    };

    async function addBook(msg, reply) {
        try {
            let { data } = msg;
            let result = await book.create(data);
            reply(null, result);
        } catch (err) {
            reply(err);
        }
    };

    async function updateBook(msg, reply) {
        try {
            let { data, id } = msg;
            let result = await book.update(data, {
                where: {
                    id: id
                }
            });
            reply(null, { msg: 'updated successfully!' })
        } catch (err) {
            console.log(err);
            reply(err);
        }
    };

    async function deleteBook(msg, reply) {
        try {
            let { id } = msg;
            let result = await book.destroy({
                where: {
                    id: id
                }
            });
            reply(null, { msg: `deleted book : ${id}` });
        } catch (err) {
            console.log(err);
            reply(err);
        }
    };

    async function checkBook(msg, reply) {
        try {
            let { id, data } = msg;
            data.status = 1;//checked
            let result = book.update(data, {
                where: {
                    id: id
                }
            });
            reply(null, { msg: `checked book: ${id}` });
        } catch (err) {
            console.log(err);
            reply(err);
        }
    };
}