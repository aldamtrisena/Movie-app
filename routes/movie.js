const route = require("express").Router()
const MovieController = require("../controllers/movieController")

route.get("/", MovieController.homeMovieHandller)
route.get("/add", MovieController.addGetMovieHandller)
route.post("/add", MovieController.postAddMovieHandller)
route.get("/edit/:id", MovieController.editGetMovieHandller)
route.post("/edit/:id", MovieController.editAddMovieHandller)
route.get("/delete/:id", MovieController.deleteMovieHandller)

module.exports = route