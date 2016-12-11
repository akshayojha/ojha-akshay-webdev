/**
 * Created by ghost on 11/29/16.
 */

module.exports = function () {

    var connectionString = 'mongodb://localhost/test'
    var mongoose =  require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server')();
    var movieModel = require('./movie/movie.model.server')();
    var reviewModel = require('./review/review.model.server')();

    var model = {
        userModel: userModel,
        movieModel: movieModel,
        reviewModel:reviewModel
    };

    userModel.setModel(model);
    movieModel.setModel(model);
    reviewModel.setModel(model);
    return model;
};
