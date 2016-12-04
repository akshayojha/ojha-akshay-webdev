/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        setModel: setModel,
        reorderWidgets: reorderWidgets
    };

    return api;
    var model = {};

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.size = 1;
        widget.width = "100%";
        return WidgetModel
            .find({_page: pageId})
            .then(function (widgets) {
                widget.index = widgets.length;
                return WidgetModel.create(widget);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return WidgetModel.update({_id: widgetId}, {$set: widget});

        // return WidgetModel
        //     .update(
        //         {
        //             _id: widgetId
        //         },
        //         {
        //             name: widget.name,
        //             text: widget.text,
        //             widgetType:widget.type,
        //             placeholder: widget.placeholder,
        //             description: widget.description,
        //             url: widget.url,
        //             width: widget.width,
        //             height: widget.height,
        //             rows: widget.rows,
        //             size: widget.size,
        //             class: widget.class,
        //             icon: widget.icon,
        //             deletable:widget.deletable,
        //             formatted:widget.formatted
        //         }
        //     );
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .remove(
                {
                    _id: widgetId
                }
            );
    }

    function setModel(_model) {
        model = _model;
    }

    function reorderWidgets(initial, final, pageId) {
        return WidgetModel.find({_id:pageId}),
            function(error, widgets) {
                var matches = [];

                for (var index in widgets) {
                    if (widgets[index].pageId === pageId) {
                        matches.push(index);
                    }
                }
                widgets.splice(matches[final], 0, widgets.splice(matches[initial], 1)[0]);
                widgets.save();
            }
    }
};