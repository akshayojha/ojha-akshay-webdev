/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
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
            .create(page);
            }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find(websiteId);
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
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