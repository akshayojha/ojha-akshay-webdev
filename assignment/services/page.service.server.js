/**
 * Created by ghost on 11/6/16.
 */

module.exports = function (app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        var newPage = {
            _id: (new Date()).getTime()+"",
            name: page.name,
            websiteId: websiteId,
            description: page.description
        };
        pages.push(newPage);
        res.send(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var matches = [];
        for (var w in pages) {
            if(pages[w].websiteId === websiteId) {
                matches.push(pages[w]);
            }
        }
        if (matches) {
            res.send(matches);
        } else {
            res.sendStatus(404);
        }
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        for (var index in pages) {
            if(pages[index]._id === pageId) {
                res.send(pages[index]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var page= req.body;
        var pageId = req.params.pid;
        for (var index in pages) {
            var oldPage = pages[index];
            if(oldPage._id === pageId) {
                oldPage['name'] = page['name'];
                oldPage['developerId'] = page['developerId'];
                oldPage['description'] = page['description'];
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        for (var index in pages) {
            if(pages[index]._id === pageId) {
                pages.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};