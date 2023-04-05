const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'gear',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('LENDER', 'BORROWER'),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
            max: 5,
            min: 0,
            isInt: true,
        }
      },
      comment: {
        type: DataTypes.TEXT,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'rating',
    }
  );
  
  module.exports = Rating;