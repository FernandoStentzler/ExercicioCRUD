const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');



//Aqui têm uma maneira de chamar cada um dos modelos
const {Movie,Genre,Actor} = require('../database/models');

// Aqui está outra maneira de chamar os modelos criados
// const Movies = db.Movie;
// const Genres = db.Genre;
// const Actors = db.Actor;


const moviesController = {

    'list': async (req, res) => {
        let {page=1} = req.query
        let {count:total, rows:movies} = await Movie.findAndCountAll({
            limit: 10,
            offset: (page - 1) * 10
        })
        let totalPagina = Math.ceil(total/10)

        res.render('moviesList2.ejs', {movies, totalPagina})           
    },
    'detail':  async (req, res) => {
        const movie = await Movie.findByPk(req.params.id,{
            include:{
                model: Genre,
                as:'genres'
            }
        })

        res.render('moviesDetail2.ejs', {movie});
            
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui estão as rotas para trabalhar com o CRUD
    add: async (req, res)  => {
        const allGenres = await Genre.findAll()
        res.render('moviesAdd', {allGenres})
    },
    create: async (req,res) => {
        const { title,
                rating,
                awards, 
                release_date, 
                length, 
                genre_id} = req.body
                  
            await Movie.create({
                title,
                rating,
                awards,
                release_date,
                length,
                genre_id
            });
            return res.redirect('/movies',);                
    },

    edit: async (req,res) => {
        const id = req.params.id;

        const movie = await Movie.findByPk(id,{
            include:{
                model: Genre,
                as:'genres'
            }            
        });
        console.log(movie)
        const allGenres = await Genre.findAll();

        return res.render('moviesEdit', {movie, allGenres})
    },
    update: async  (req,res) => {
        const id = req.params.id
        
        const { title,
            rating,
            awards, 
            release_date, 
            length, 
            genre_id} = req.body
        
        await Movie.update({
            title,
            rating,
            awards, 
            release_date, 
            length, 
            genre_id
        },
        {
            where:{
                id:id
            }
        })        
        return res.redirect('/movies')
    },
    delete: function (req,res) {

    },
    destroy: async (req,res)=>{
        let id = req.params.id

        const resultado = await Movie.destroy({
            where:{
                id:id
            }
        })
        res.redirect('/movies')
    },
}

module.exports = moviesController;