/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema(
        {
            title: {type: String, required: true},
            timestamp: {type: Date, default: Date.now()},
            movieId: {type: String, required: true},
            _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
            _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
            reaction: {type: String, enum: ['Neutral', 'Recommended', 'Negative'], required: true}
        }, {
            collection: "review"
        });
    return ReviewSchema;
};