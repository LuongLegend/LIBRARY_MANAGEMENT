const seneca = require('seneca')();
const Promise = require('bluebird');
const senecaAct = Promise.promisify(seneca.act, { context: seneca });
seneca.use(require('../service/book_service'));

module.exports.getOrFindBook = async (req, res, next) => {
    try {
        //just have a search box to find Book
        let { q, page } = req.query;
        if (!q) {
            let result = await senecaAct({ role: 'book', cmd: 'getAll' });
            res.json(result);
        } else {
            let data = { q, page };
            let result = await senecaAct({ role: 'book', cmd: 'findBook', data: data });
            let msg = `search results: ${q}`;
            if (result.length === 0) res.json({ msg, result: 'no result match your search information' });
            else
                res.json({ msg, result });
        }
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getAbook = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await senecaAct({ role: 'book', cmd: 'getAbook', id: id });
        if(!result) res.json({msg: 'cannot find this book'});
        else
            res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.addBook = async (req, res, next) => {
    try {
        let { author_id, catalog_id, title, isbn, description } = req.body;
        if(!title || !isbn) res.json({msg: 'title or isbn cannot be empty'});
        let create_time = Date.now();
        let create_by = req.id;
        let status = -1;
        let data = { author_id, catalog_id, title, isbn, status, description, create_time, create_by }
        let result = await senecaAct({ role: 'book', cmd: 'addBook', data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.updateBook = async (req, res, next) => {
    try {
        let { author_id, catalog_id, title, isbn, description } = req.body;
        let data = { author_id, catalog_id, title, isbn, description };
        let { id } = req.params;
        let result = await senecaAct({ role: 'book', cmd: 'updateBook', data: data, id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.deleteBook = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await senecaAct({ role: 'book', cmd: 'deleteBook', id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.checkBook = async (req, res, next) => {
    try {
        let { id } = req.params;
        let approved_time = Date.now();
        let approved_by = req.id;
        let status = 1;
        let data = { approved_time, approved_by, status };
        let result = await senecaAct({ role: 'book', cmd: 'checkBook', data: data, id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};