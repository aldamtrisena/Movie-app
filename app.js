const express = require("express")
const app = express()
const PORT = 3000
const route = require("./routes")
const session = require("express-session")



// app.use(session({
//     "secreat": "abcd"
// }))

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))

app.use("/", route)
// user

app.listen(PORT, () => {
    console.log(`masuk ke PORT ${PORT}`)
})