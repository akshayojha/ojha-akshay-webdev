/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    var api = {
        findAllMoviesForUser:findAllMoviesForUser,
        findMovieById:findMovieById,
        setModel: setModel
    };

    return api;

    var model = {};

    function findAllMoviesForUser(userId) {
        return MovieModel.find(userId);
    }

    function findMovieById(movieId) {
        return MovieModel.findById(movieId);
    }

    function setModel(_model) {
        model = _model;
    }
};