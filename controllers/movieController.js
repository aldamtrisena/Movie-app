const {ProductionHouse, Movie} = require("../models")

class MovieController{

    static homeMovieHandller(req,res){
        Movie.findAll({ 
            include : [ProductionHouse], 
            order : [
            ['name', 'ASC']
        ]})
            .then(data => {
                res.render("movie", { data })
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static addGetMovieHandller(req,res){
        let error
        if(req.query.mes){
            error = JSON.parse(req.query.mes)
        }
        ProductionHouse.findAll()
            .then(data => {
                res.render("addMovie", {data, error})
            })
    }

    static postAddMovieHandller(req,res){
       let err = []
        if(!req.body.name){
            err.push("name can't be empty")
        }
        if(!req.body.released_year){
            err.push("year can't be empty")
        }
        if(!req.body.genre){
            err.push("genre can't be empty")
        }
        if(!req.body.ProductionHouseId){
            err.push("Production House can't be empty")
        }
        if(err.length > 0){
            res.redirect(`/movies/add?mes=${JSON.stringify(err)}`)
        } else {

            let value = {
                name : req.body.name,
                released_year : +req.body.released_year,
                genre : req.body.genre,
                ProductionHousesId : +req.body.ProductionHouseId
            }
            
            Movie.create(value)
                .then(data =>{
                    res.redirect("/movies")
                })
                .catch(err =>{
                    res.send(err.message)
                })        
        }
    }

    static editGetMovieHandller(req,res){
        let error
        if(req.query.mes){
            error = JSON.parse(req.query.mes)
        }
        
        let newId = req.params.id 
        let movie = null
        Movie.findByPk(newId , {
            include : 
            [ProductionHouse]
            })
            .then(result =>{
                movie = result
                return ProductionHouse.findAll()    
            })
            .then(phouse => {
                let data = []
                data.push(movie)
                res.render("EditMovie", { data, phouse, error  })
            })
            .catch(err =>{
                res.send(err)
            })
    }

    static editAddMovieHandller(req,res){
        let err = []
        if(!req.body.name){
            err.push("name can't be empty")
        }
        if(!req.body.released_year){
            err.push("year can't be empty")
        }
        if(!req.body.genre){
            err.push("genre can't be empty")
        }
        if(!req.body.ProductionHouseId){
            err.push("Production House can't be empty")
        }
        if(err.length > 0){
            res.redirect(`/movies/add?mes=${JSON.stringify(err)}`)
        } else {
            let value = {
                name : req.body.name,
                released_year : +req.body.released_year,
                genre : req.body.genre,
                ProductionHousesId : +req.body.ProductionHouseId
            }
            Movie.update(value,{
                where : {
                    id: +req.params.id
                }
            })
            .then(res.redirect("/movies"))
            .catch(err=>{
                res.send(err)
            })
        }
    }

    static deleteMovieHandller(req, res){
        Movie.destroy({
            where : {
                id : +req.params.id
            }
        })
        .then(res.redirect("/movies"))
        .catch(err => {
            res.send(err)
        })

    }

}

module.exports = MovieController