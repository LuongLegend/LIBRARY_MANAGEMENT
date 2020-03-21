//get model
const user_permission = require('./user_permission');
const user = require('./user');
const book = require('./book');
const author = require('./author');
const catalog = require('./catalog');
//define relationship between models
//user:1 - user_permission: N ___ foreignKey: user_id(save in user_permisison Model)
user.hasMany(user_permission);
user_permission.belongsTo(user);
//author:1 - book: N ___ foreignKey: author_id(save in book model)
book.belongsTo(author);
author.hasMany(book);
//catalog:1 - book: N ___ foreignKey: catalog_id(save in book model)
book.belongsTo(catalog);
catalog.hasMany(book);

module.exports = {
    user: user,
    user_permission: user_permission,
    book: book,
    author: author,
    catalog: catalog
}