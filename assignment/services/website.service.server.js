/**
 * Created by ghost on 11/6/16.
 */

module.exports = function(app, model) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        model
            .websiteModel
            .createWebsite(userId, website)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userID = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(userID)
            .then(
                function (websites) {
                    res.send(websites);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteID = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(websiteID)
            .then(
                function (website) {
                    res.send(website);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(function (resp) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                }
                ,
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};