const seneca = require('seneca')();
const Promise = require('bluebird');
const senecaAct = Promise.promisify(seneca.act, { context: seneca });
seneca.use(require('../service/author_service'));
module.exports.addAuthor = async (req, res, next) => {
    try {
        let { name, description, email } = req.body;
        if (!name) res.json({ msg: 'name is not empty' });
        let data = { name, description, email };
        let result = await senecaAct({ role: 'author', cmd: 'addAuthor', data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.updateAuthor = async (req, res, next) => {
    try {
        let { name, description, email } = req.body;
        let { id } = req.params;
        let data = { name, description, email };
        let result = await senecaAct({ role: 'author', cmd: 'updateAuthor', data: data, id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getAnAuthor = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await senecaAct({ role: 'author', cmd: 'getAnAuthor', id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getOrFindAuthor = async (req, res, next) => {
    try {
        let { q, page } = req.query;
        if (!q) {
            let result = await senecaAct({ role: 'author', cmd: 'getAll' });
            res.json(result);
        } else {
            let data = { q, page};
            let result = await senecaAct({ role: 'author', cmd: 'findAuthor', data: data });
            let msg = `search results: ${q}`;
            if(result.length === 0) res.json({msg,result: 'no result match your search information'});
            else
                res.json({msg,result});
        }
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};