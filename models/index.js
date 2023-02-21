const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

//One-to-Many Relationship between Restaurant & Menu
Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

//Many-to-Many Relationship between Menu & Item
Menu.belongsToMany(Item, {through: "menu_item_junction"})
Item.belongsToMany(Menu, {through: "menu_item_junction"})

module.exports = { 
    Restaurant, 
    Menu,
    Item
}
