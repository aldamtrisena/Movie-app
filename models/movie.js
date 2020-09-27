'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.ProductionHouse, {
        targetKey: 'id',
        foreignKey: 'ProductionHousesId'
      }),
      Movie.belongsToMany(models.Cast,{through : models.MovieCast}),
      Movie.hasMany(models.MovieCast)
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : DataTypes.INTEGER,
      validate : {
      isEven : (value) => {
        if (value % 4 === 0) {
          throw new Error(`Can't Input Movie For This Year!`);
        }
      }
    }
    },
    genre: DataTypes.STRING,
    ProductionHousesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};