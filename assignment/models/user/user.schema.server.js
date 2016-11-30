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
            websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
            dateCreated: Date
        }, {
            collection:"user"
        });
    return UserSchema;
};
