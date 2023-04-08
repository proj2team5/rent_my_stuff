const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Loan extends Model {}

Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'gear',
          key: 'id',
        },
      },
      cost_per_day: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('REQUESTED', 'DENIED','RECEIVED','RETURNED'),
        allowNull: false,
      },
      received_date: {
        type: DataTypes.DATE,
      },
      returned_date: {
        type: DataTypes.DATE,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      borrower_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      hooks: {
        beforeUpdate: async (loanData) => {
          if (loanData.status === "RECEIVED"){
            loanData.received_date = Date.now();
          }else if (loanData.status === "RETURNED"){
            loanData.returned_date = Date.now();
          }
          return loanData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'loan',
    }
  );
  
  module.exports = Loan;