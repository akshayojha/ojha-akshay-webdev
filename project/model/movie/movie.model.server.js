/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    var api = {
        findMovieById:findMovieById,
        setModel: setModel,
        findFavoriteMovies:findFavoriteMovies,
        addMovie:addMovie
    };
    function findFavoriteMovies(movieIds) {
        return MovieModel.find({movieId: {$in: movieIds}});
    }
    return api;

    var model = {};

    function addMovie(movie) {
        movie.movieId = movie.imdbID.toString();
        console.log("Creatred");
        return MovieModel.create(movie);
    }
    
    function findMovieById(movieId) {
        return MovieModel.findOne({movieId: movieId});
    }

    function setModel(_model) {
        model = _model;
    }
};