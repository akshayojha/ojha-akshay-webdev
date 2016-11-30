/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server');
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser:findAllWebsitesForUser,
        findWebsiteById:findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };

    return api;
    var model = {};

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function (website) {
                return model
                    .userModel
                    .findUserById(userId)
                    .then(function (user) {
                        user.websites.push(website);
                        website._user= user._id;
                        website.save();
                        return user.save();
                    });
            });
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findWebsiteById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name : website.name,
                    description: website.description
                }
            );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove(
                {
                    _id:websiteId
                }
            );
    }

    function setModel(_model) {
        model = _model;
    }



};