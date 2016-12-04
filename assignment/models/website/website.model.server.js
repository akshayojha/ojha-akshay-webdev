/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
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
            .create(website);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find(userId);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
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