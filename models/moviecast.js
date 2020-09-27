'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieCast.belongsTo(models.Cast),
      MovieCast.belongsTo(models.Movie)
    }
  };
  MovieCast.init({
    role: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          msg : "Role can't be empty"
        }
      }
    },
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCast',
  });
  return MovieCast;
};