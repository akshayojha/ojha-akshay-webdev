/**
 * Created by ghost on 11/6/16.
 */

module.exports = function(app) {
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];


    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        var newWebsite = {
            _id: (new Date()).getTime() + "",
            name: website.name,
            developerId: userId,
            description: website.description
        };
        websites.push(newWebsite);
        res.send(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userID = req.params.uid;
        var match = [];
        for (var w in websites) {
            if (websites[w].developerId === userID) {
                match.push(websites[w]);
            }
        }
        if (match) {
            res.send(match);
        } else {
            res.sendStatus(404);
        }
    }

    function findWebsiteById(req, res) {
        var websiteID = req.params.wid;
        for (var index in websites) {
            if (websites[index]._id === websiteID) {
                res.send(websites[index]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var website = req.body;
        for (var index in websites) {
            var oldWebsite = websites[index];
            if (oldWebsite._id === websiteId) {
                oldWebsite['name'] = website['name'];
                oldWebsite['developerId'] = website['developerId'];
                oldWebsite['description'] = website['description'];
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        for (var index in websites) {
            if (websites[index]._id === websiteId) {
                websites.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};