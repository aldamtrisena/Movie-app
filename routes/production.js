const route = require("express").Router()
const ProductionController = require("../controllers/productionController")

route.get("/", ProductionController.productionListHandller)

module.exports = route