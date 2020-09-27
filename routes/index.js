const route = require("express").Router()
const ProductionController = require("../controllers/productionController")
const routeProduction = require("./production")
const routeMovie = require("./movie")
const routeCast = require("./cast")
const routeUser = require("./users")


route.get("/", ProductionController.home)

route.use("/productions", routeProduction)
route.use("/movies", routeMovie)
route.use("/cast", routeCast)
route.use("/users", routeUser)

module.exports = route
