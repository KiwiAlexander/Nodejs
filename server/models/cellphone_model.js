'use strict';
module.exports = (sequelize, DataTypes) => {
 var cellphones = sequelize.define('cellphones', {
   Country: DataTypes.STRING,
   year: DataTypes.TEXT
 }, {});
 cellphones.associate = function(models) {};
 return cellphones;
};