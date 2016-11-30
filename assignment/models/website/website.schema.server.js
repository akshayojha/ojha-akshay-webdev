/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema(
        {
            _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
            name: {type: String, required: true},
            description: String,
            pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
            dateCreated: Date
        }, {
            collection: "website"
        });
    return WebsiteSchema;
};