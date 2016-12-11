/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema(
        {
            imdbId: {type:String, unique:true},
            Plot: {type: String, required: true},
            likes: {type:Number, default:0},
            reviews: {type:Number, default:0}
        }, {
            collection: "movie"
        });
    return MovieSchema;
};