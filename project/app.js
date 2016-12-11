/**
 * Created by ghost on 12/10/16.
 */
module.exports = function (app) {
    var models = require("./models/models.server.js")();
    require("./services/")(app, models);

};