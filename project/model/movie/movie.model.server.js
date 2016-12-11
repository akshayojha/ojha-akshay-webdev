/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    var api = {
        findMovieById:findMovieById,
        setModel: setModel
    };

    return api;

    var model = {};

    function findMovieById(movieId) {
        return MovieModel.findById(movieId);
    }

    function setModel(_model) {
        model = _model;
    }
};