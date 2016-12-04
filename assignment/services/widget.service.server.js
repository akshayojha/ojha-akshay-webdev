/**
 * Created by ghost on 11/6/16.
 */

module.exports =  function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.put("/api/page/:pid/widget", sortWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                }, function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                }, function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (resp) {
                    res.send(resp);
                }, function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (resp) {
                    res.sendStatus(200);
                }, function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        // var width = req.body.width;
        var myFile = req.file;
        // var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        // var path = myFile.path;         // full path of uploaded file
        // var destination = myFile.destination;  // folder where file is saved to
        // var size = myFile.size;
        // var mimeType = myFile.mimetype;
        var redirectURL = req.body.redirectURL;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var url = '/assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
        var widget = {
            url: "/assignment/uploads/" + filename
        };
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(function (resp) {
                res.redirect(url);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function sortWidgetsForPage(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pid;
        model
            .widgetModel
            .reorderWidgets(initial, final, pageId)
            .then(function (resp) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }
};