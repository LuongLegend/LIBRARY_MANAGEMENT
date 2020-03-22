const seneca = require('seneca')();
const Promise = require('bluebird');
const senecaAct = Promise.promisify(seneca.act, { context: seneca });
seneca.use(require('../service/catalog_service'));
module.exports.addCatalog = async (req, res, next) => {
    try {
        let { name, alias } = req.body;
        if (!name || !alias) res.json({ msg: 'name or alias is not empty' });
        let create_time = Date.now();
        let create_by = req.id;
        let data = { name, alias, create_time, create_by };
        let result = await senecaAct({ role: 'catalog', cmd: 'addCatalog', data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.updateCatalog = async (req, res, next) => {
    try {
        let { name, alias } = req.body;
        let last_update_by = req.id;
        let last_update_time = Date.now();
        let { id } = req.params;
        let data = { name, alias, last_update_by, last_update_time };
        let result = await senecaAct({ role: 'catalog', cmd: 'updateCatalog', data: data, id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.deleteCatalog = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await senecaAct({ role: 'catalog', cmd: 'deleteCatalog', id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getAcatalog = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await senecaAct({ role: 'catalog', cmd: 'getAcatalog', id: id });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getOrFindCatalog = async (req, res, next) => {
    try {
        let {q, page} = req.query;
        if(!q) {
            let result = await senecaAct({role:'catalog', cmd: 'getAll'});
            res.json(result);
        }else{
            let data = {q, page};  
            let result = await senecaAct({ role: 'catalog', cmd: 'findCatalog', data: data });
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