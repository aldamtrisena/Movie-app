const { ProductionHouse } = require("../models")

class ProductionController {

    static home(req,res){
        res.render("home")
    }

    static productionListHandller(req, res){
        ProductionHouse.findAll({
            order : [
                ['name', 'ASC']
            ]
        })
        .then(data => {
            res.render("production", {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = ProductionController