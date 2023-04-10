const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create gear model inheriting from sequelize model class
class Gear extends Model {}

Gear.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: { // will be a relative path to the image
        type: DataTypes.STRING,
      },
      cost_per_day: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('LENSES', 'BODY','FLASH','LIGHTS'), // we use enums to restrict the possible values of the categories
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
      posted_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      owner_id: { //owner_id will be foreign key to user model
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (newGearData) => {
          newGearData.available = 1;
          return newGearData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'gear',
    }
  );
  
  module.exports = Gear;