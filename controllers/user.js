const { User } = require("../models/index")
const bcrypt = require("bcrypt")

class UserController {

    static addForm(req, res) {
        let error
        if (req.query.err) {
            error = JSON.parse(req.query.err)
        }
        res.render("registerUser", { error })
    }

    static postAdd(req, res) {
        let value = {
            username: req.body.username,
            password: req.body.password
        }

        let msg = []
        if (!req.body.username) {
            msg.push("username can't be empty")
        }
        if (!req.body.password) {
            msg.push("password can't be empty")
        }
        if (req.body.password !== req.body.password2) {
            msg.push("password can't maching")
        }

        if (req.body.password && req.body.password2 && req.body.password.length < 6) {
            msg.push("pass mush be min 6 character")
        }
        if (msg.length > 0) {
            res.redirect(`/users/add?err=${JSON.stringify(msg)}`)
        } else {
            User.findOne({
                where: {
                    username: value.username
                }
            })
                .then(data => {
                    if (data) {
                        msg.push(`email has ready register`)
                        res.redirect(`/users/add?err=${JSON.stringify(msg)}`)
                    } else {

                        return User.create(value)
                    }
                })
                .then(() => res.redirect("/"))
                .catch(err => {
                    res.send(err.message)
                })
        }

    }

    static loginGet(req, res) {
        let error
        if (req.query.err) {
            error = JSON.parse(req.query.err)
        }
        res.render("homelogin", { error })
    }

    static loginPost(req, res) {
        let value = {
            username: req.body.username,
            password: req.body.password
        }
        let msg = []
        if (!req.body.username) {
            msg.push("username can't be empty")
        }
        if (!req.body.password) {
            msg.push("password can't be empty")
        }

        if (msg.length > 0) {
            res.redirect(`/users/login?err=${JSON.stringify(msg)}`)
        }

        User.findOne({
            where: {
                username: value.username
            }
        })
            .then(data => {
                if (data) {
                    let hast = data.password
                    return bcrypt.compare(req.body.password, hast)
                } else {
                    msg.push("username or password wrong!")
                    res.redirect(`/users/login?err=${JSON.stringify(msg)}`)
                }
            })
            .then(result => {
                if (result) {
                    res.redirect("/users/home")
                } else {
                    msg.push("username or password wrong!")
                    res.redirect(`/users/login?err=${JSON.stringify(msg)}`)
                }
            })
            .catch(err => {
                res.send(err)
            })

    }

    static home(req, res) {
        res.render("homeUser")
    }
}

module.exports = UserController