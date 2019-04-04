'use strict';
module.exports = (sequelize, DataTypes) => {
  const numero = sequelize.define('numero', {
    numero: DataTypes.STRING,
    contactId: DataTypes.INTEGER
  }, {});
  numero.associate = function(models) {
    // associations can be defined here
    numero.belongsTo(models.contact);
  };
  return numero;
};
