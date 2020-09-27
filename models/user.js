'use strict';
const bcrypt = require("bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "username can't be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "pass can't be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, opt) => {
        let saltRound = 10
        let hast = bcrypt.hashSync(instance.password, saltRound)
        instance.password = hast
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};