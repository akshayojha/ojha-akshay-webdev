/**
 * Created by ghost on 11/29/16.
 */

module.exports = function () {

    var connectionString = 'mongodb://localhost/test'
    var mongoose =  require('mongoose');

    if(process.env.MLAB_DB_USERNAME) {
        connectionString = process.env.MLAB_DB_URL_INIT +
            process.env.MLAB_DB_USERNAME + ":" +
            process.env.MLAB_DB_PASSWORD +
            process.env.MLAB_DB_URL_END + '/' +
            process.env.MLAB_DB_NAME;
    }

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
