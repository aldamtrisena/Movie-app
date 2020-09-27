const { User } = require("../models/index")
const bcrypt = require("bcrypt")

class UserController {

    static addForm(req, res) {
        res.render("addUser")
    }

    static postAdd(req, res) {
        // res.send(req.body)
        let pass = req.body.password
        let saltRound = 5
        bcrypt.hash(pass, saltRound, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                let value = {
                    username: req.body.username,
                    password: result
                }
                User.create(value)
                    .then(() => res.redirect("/users"))
            }
        })


    }

    static login(req, res) {

    }

    static home(req, res) {

    }
}

module.exports = UserController