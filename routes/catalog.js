const router = require('express').Router();
const Controllers = require('../controllers/catalog');

router.post('/', Controllers.addCatalog);
router.put('/:id', Controllers.updateCatalog);
router.delete('/:id', Controllers.deleteCatalog);
router.get('/:id', Controllers.getAcatalog);
router.get('/', Controllers.getOrFindCatalog);
module.exports = router;