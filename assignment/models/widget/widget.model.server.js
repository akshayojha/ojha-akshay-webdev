/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server');
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
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        return findAllWidgetsForPage(pageId)
                            .then(function (widget) {
                                page.widgets.push(widget._id);
                                page.save();
                                widgetObj._page = page._id;
                                return widgetObj.save();
                            })
                    });
            });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findWidgetById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name,
                    text: widget.text,
                    type:widget.type,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable:widget.deletable,
                    formatted:widget.formatted
                }
            );
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