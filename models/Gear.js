const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
      image_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        }
      },
      cost_per_day: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('LENSES', 'BODY','FLASH','LIGHTS'),
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
      owner_id: {
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
          console.log(newGearData);
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