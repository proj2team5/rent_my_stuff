const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create loan model inheriting from sequelize model class
class Loan extends Model {}

Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: { //product_id will be foreign key to gear model
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
        type: DataTypes.ENUM('REQUESTED', 'DENIED','RECEIVED','RETURNED'), // we use enums to restrict the possible values of status a loan can be in
        allowNull: false,
      },
      received_date: {
        type: DataTypes.DATE,
      },
      returned_date: {
        type: DataTypes.DATE,
      },
      owner_id: { //owner_id will be foreign key to user model 
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      borrower_id: { //borrower_id will be foreign key to user model 
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'loan',
    }
  );
  
  module.exports = Loan;