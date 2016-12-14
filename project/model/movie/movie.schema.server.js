/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema(
        {
            movieId: {type:String, unique:true},
            title:String,
            plot:String,
            Poster:String
        }, {
            collection: "movie"
        });
    return MovieSchema;
};