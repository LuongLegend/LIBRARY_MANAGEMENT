const router = require('express').Router();
const Controllers = require('../controllers/book');
router.get('/',Controllers.getOrFindBook);
router.post('/',Controllers.addBook);
router.put('/:id',Controllers.updateBook);
router.delete('/:id', Controllers.deleteBook);
router.get('/:id/check', Controllers.checkBook);
router.get('/:id', Controllers.getAbook);
module.exports = router;