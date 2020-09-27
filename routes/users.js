const route = require("express").Router()
const UserController = require("../controllers/user")

// form route // /users/


route.get("/add", UserController.addForm)
route.post("/add", UserController.postAdd)
// login

route.get("/login", UserController.loginGet)
route.post("/login", UserController.loginPost)

// home
route.get("/home", UserController.home)

module.exports = route