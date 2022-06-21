const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const movieValidate = require('../middlewares/movieValidate')

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);
//Rotas necessárias para a criação do CRUD
//Create
router.get('/add', moviesController.add);
router.post('/create',movieValidate, moviesController.create);

//Update
//router.get('/movies/edit/:id', moviesController.edit);
//router.post('/movies/update/:id', moviesController.update);

//Delete
//router.get('/movies/delete/:id', moviesController.delete);
//router.post('/movies/delete/:id', moviesController.destroy);

module.exports = router;