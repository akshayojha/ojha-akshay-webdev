/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema(
        {
            _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
            widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true},
            name: String,
            text: String,
            placeholder: String,
            description: String,
            url: String,
            width: String,
            height: String,
            rows: Number,
            size: Number,
            index: Number,
            class: String,
            icon: String,
            deletable: Boolean,
            formatted: Boolean,
            dateCreated: Date
        }, {
            collection: "widget"
        });

    return WidgetSchema;
};