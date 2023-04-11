const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create User model inheriting from sequelize model class
class User extends Model {
  checkPassword(loginPw) { // instance method to check given password with stored hashed password using bycrypt
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // we only allow one account for each email
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // we will be login in using username and therefore it will need to be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { // ensure password is a minimum of 8 characters
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => { // hashes password of newly created users before storing in db
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;