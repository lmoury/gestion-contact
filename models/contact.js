'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING
  }, {});
  contact.associate = function(models) {
    // associations can be defined here
    contact.hasMany(models.numero);
  };
  return contact;
};
