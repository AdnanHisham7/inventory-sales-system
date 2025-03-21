// models/Sale.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'card', 'upi', 'qr'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleItem, { foreignKey: 'saleId' }); // Ensure this association exists
    Sale.belongsTo(models.User, { foreignKey: 'userId' });
    Sale.hasOne(models.Payment, { foreignKey: 'saleId' });
  };

  return Sale;
};