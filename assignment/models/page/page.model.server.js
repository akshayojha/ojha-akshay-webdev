/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server');
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite:findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };

    return api;
    var model = {};

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (page) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page._id);
                        website.save();
                        page._website = website._id;
                        return page.save();
                    });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        return PageModel.findPageById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name : page.name,
                    title : page.title,
                    description: page.description
                }
        );
    }

    function deletePage(pageId) {
      return PageModel
          .remove(
              {
                  _id:pageId
              }
          );
    }

    function setModel(_model) {
        model = _model;
    }



};