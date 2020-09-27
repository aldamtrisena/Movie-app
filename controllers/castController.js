const {Movie, Cast, MovieCast} = require("../models")

class CastController {

    static allCastHandller(req,res){
        // res.send("oke")
        Cast.findAll()
            .then(data =>{
              
                res.render("CastList", {data})
            })
    }

    static addGetCastHandller(req,res){
        res.render("addCast")
    }

    static addPostCastHandller(req,res){
        console.log(req.body)
        let value = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            phone_number : req.body.phone_number,
            birth_year : +req.body.birth_year,
            gender : req.body.gender
        }
        Cast.create(value)
            .then(data => {
                res.redirect("/cast")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editGetCastHandller(req,res){
        
        Cast.findByPk(+req.params.id)
            .then(data => {
                console.log(data)
                res.render("editCast", {data})
            })
    }

    static editPostCastHandller(req,res){  
        let value = {
            first_name : req.body.first_name,
            last_name : +req.body.last_name,
            birth_year : req.body.birth_year,
            phone_number : +req.body.phone_number,
            gender : req.body.gender
        }
        Cast.update(value,{
            where : {
                id: +req.params.id
            }
        })
        .then(res.redirect("/cast"))
        .catch(err=>{
            res.send(err)
        })
    }

    static deleteCastHandller(req,res){
        // res.send(req.params)
        Cast.destroy({
            where : {
                id : +req.params.id
            }
        })
        .then(res.redirect("/cast"))
        .catch(err => {
            res.send(err)
        })
    }

   static addNewCastToMovieList(req,res){
        // res.send(req.params)
        let data = null
        Movie.findByPk(req.params.id,{
            include : [Cast, MovieCast]
        })
        .then(result =>{
            // res.send(data)
            data = result
            return Cast.findAll()
        })
        .then(cast => {
            // res.send({data , cast} )
            // console.log(data)
            res.render("addCastToMovie", {data, cast})
            })
            .catch(err => {
                res.send(err)
            })

    }

    static addNewCastToMovieListPost(req,res){
        let value = {
            MovieId : +req.params.id,
            CastId : +req.body.id,
            role : req.body.role
        
        }
        MovieCast.create(value)
            .then(data => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err.message)
            })
       
    }

    static seeMovieHandller(req,res){
        // res.send(req.params)
        Cast.findByPk(+req.params.id, {
            include : [Movie,MovieCast]
        })
        .then(data => {
            // res.send(data)
            res.render("seeMovie",{data})
        })

    }

    
}

module.exports = CastController