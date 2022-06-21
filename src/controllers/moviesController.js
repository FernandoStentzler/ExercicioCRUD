const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Genre = require('../database/models/Genre');
const { validationResult } = require('express-validator');
const Movie = require('../database/models/Movie');


//Aqui têm uma maneira de chamar cada um dos modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aqui está outra maneira de chamar os modelos criados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
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
        const allGenres = await Genres.findAll()
        res.render('moviesAdd', {allGenres})
    },
    create: async (req,res) => {
        const {title, rating, awards, release_date, length, genre_id} = req.body

        let errors = validationResult(req)

        if(errors.isEmpty()){            
        }else{
            console.log(errors.mapped())
            await Movies.create({
                title,
                rating,
                awards,
                release_date,
                length,
                genre_id
            });
            return res.render('moviesAdd', {errors: errors.mapped(), old: req.body});
        }        
    },

    edit: function(req,res) {

    },
    update: function (req,res) {

    },
    delete: function (req,res) {

    },
    destroy: function (req,res) {

    }
}

module.exports = moviesController;