/**
 * Created by ghost on 11/29/16.
 */

module.exports = function () {
    var mongoose =  require('mongoose');
    var UserSchema = mongoose.Schema(
        {
            username: {type: String, required: true, unique: true},
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            favoriteMovies: [String],
            followers: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
            following: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
            role: {type:String, default:'general'},
            dateCreated: Date
        }, {
            collection:"user"
        });
    return UserSchema;
};
