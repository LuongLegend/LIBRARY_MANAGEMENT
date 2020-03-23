const router = require('express').Router();
const Controllers = require('../controllers/book');
router.get('/',Controllers.getOrFindBook);
router.post('/',Controllers.addBook);
router.put('/:id',Controllers.updateBook);
router.delete('/:id', Controllers.deleteBook);
router.put('/:id/check', Controllers.checkBook);
router.get('/:id', Controllers.getAbook);
module.exports = router;