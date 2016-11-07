/**
 * Created by ghost on 11/6/16.
 */

module.exports =  function (app) {
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "index": 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "index": 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "index": 5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 6}
    ];

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
        var newWidget = {
            _id: (new Date()).getTime() + "",
            widgetType: widget.widgetType,
            pageId: pageId,
            size: widget.size,
            text: widget.text,
            index: widgets.length
        };
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        var matches = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                matches.push(widgets[w]);
            }
        }
        if (matches) {
            res.send(matches);
        } else {
            res.sendStatus(400);
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                res.send(widgets[index]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        for (var index in widgets) {
            var oldWidget = widgets[index];
            if (oldWidget._id === widgetId) {
                oldWidget['size'] = widget['size'];
                oldWidget['text'] = widget['text'];
                oldWidget['url'] = widget['url'];
                oldWidget['width'] = widget['width'];
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                widgets.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.wgid;
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimeType = myFile.mimetype;
        var redirectURL = req.body.redirecturl;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                widgets[index].url = "/assignment/uploads/"+filename;
                widgets[index].width = width;

            }
        }
        var url = '/assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
        res.redirect(url);
    }

    function sortWidgetsForPage(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pid;

        var matches = [];

        for (var index in widgets) {
            if (widgets[index].pageId === pageId) {
                matches.push(index);
            }
        }
        widgets.splice(matches[final], 0, widgets.splice(matches[initial], 1)[0]);
        res.sendStatus(200);
    }
};