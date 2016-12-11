/**
 * Created by ghost on 12/10/16.
 */
module.exports = function(app) {
    var models = require("./model/model.server.js");
    require('./services/user.service.server')(app, models);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};