const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create rating model inheriting from sequelize model class
class Rating extends Model {}

Rating.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { //user_id will be foreign key to user model
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      product_id: { //product_id will be foreign key to gear model
        type: DataTypes.INTEGER,
        references: {
          model: 'gear',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('LENDER', 'BORROWER'), // we use enums to restrict the possible values of the rate type
        allowNull: false,
      },
      rating: { // rating must be a value from 0 to 5
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