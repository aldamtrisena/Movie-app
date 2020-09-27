const route = require("express").Router()
const UserController = require("../controllers/user")

route.get("/add", UserController.addForm)
route.post("/add", UserController.postAdd)

module.exports = route