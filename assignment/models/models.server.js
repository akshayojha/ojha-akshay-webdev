/**
 * Created by ghost on 11/29/16.
 */

module.exports = function () {
    var mongoose =  require('mongoose');
    var connectionString = 'mongodb://admin:admin@ds035766.mlab.com:35766/ojha-akshay-webdev'

    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };


    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};
