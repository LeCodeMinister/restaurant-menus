const { sequelize, DataTypes} = require('../db');
const { Sequelize } = require('sequelize');

let Item = sequelize.define("Item", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN
});

module.exports = {
    Item
};