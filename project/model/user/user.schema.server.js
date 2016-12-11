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
            favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref:'MovieModel'}],
            followers: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
            following: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
            role: {type: String, enum: ['general', 'critic'], default: 'general'},
            dateCreated: Date
        }, {
            collection:"user"
        });
    return UserSchema;
};
