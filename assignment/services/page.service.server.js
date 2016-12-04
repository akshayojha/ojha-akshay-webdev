/**
 * Created by ghost on 11/6/16.
 */

module.exports = function (app, model) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {

        var websiteId = req.params.wid;
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var page= req.body;
        var pageId = req.params.pid;
        console.log(page);
        model
            .pageModel
            .updatePage(pageId, page)
            .then (function (resp) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        model
            .pageModel
            .deletePage(pageId)
            .then(function (resp) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }
};