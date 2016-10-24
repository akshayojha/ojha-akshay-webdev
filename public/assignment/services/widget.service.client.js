/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget: updateWidget,
            deleteWidget:deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: widget.widgetType,
                pageId: pageId,
                size: widget.size,
                text: widget.text
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            var matches = [];
            for (var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    matches.push(widgets[w]);
                }
            }
            return matches;
        }

        function findWidgetById(widgetId) {
            for (var index in widgets) {
                if(widgets[index]._id === widgetId) {
                    return widgets[index];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var index in widgets) {
                var oldWidget = widgets[index];
                if(oldWidget._id === widgetId) {
                    oldWidget['size'] = widget['size'];
                    oldWidget['text'] = widget['text'];
                    oldWidget['url'] = widget['url'];
                    oldWidget['width'] = widget['width'];
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for (var index in widgets) {
                if(widgetId[index]._id === widgetId) {
                    widgets.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();

