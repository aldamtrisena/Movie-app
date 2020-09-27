const route = require("express").Router()
const CastController = require("../controllers/castController")

route.get("/", CastController.allCastHandller)
route.get("/add", CastController.addGetCastHandller)
route.post("/add", CastController.addPostCastHandller)
route.get("/edit/:id", CastController.editGetCastHandller)
route.post("/edit/:id", CastController.editPostCastHandller)
route.get("/addcast/:id", CastController.addNewCastToMovieList)
route.post("/addcast/:id", CastController.addNewCastToMovieListPost)
route.get("/delete/:id", CastController.deleteCastHandller)
route.get("/seemovies/:id", CastController.seeMovieHandller)


module.exports = route