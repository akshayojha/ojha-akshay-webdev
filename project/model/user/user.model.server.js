/**
 * Created by ghost on 11/29/16.
 */

module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('userModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        toggleLike: toggleLike,
        toggleFollowing: toggleFollowing,
        findUserByEmail: findUserByEmail,
        setModel: setModel
    };
    
    return api;
    var model = {};

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByEmail(email) {
        return UserModel.findOne({email: email});
    }

    function toggleLike(userId, mid) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                var movies = user.favoriteMovies;
                if (movies.indexOf(mid) > -1){
                    return UserModel.update({_id:userId}, {$pullAll:{favoriteMovies:mid}});
                } else {
                    return UserModel.update({_id:userId}, {$addToSet:{favoriteMovies:mid}});
                }
            }, function(error){
                console.log("Error: "+error);
            });
    }

    function toggleFollowing(userId, followingUserId) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                var followers = user.followers;
                if (followers.indexOf(followingUserId) > -1){
                    return UserModel.update({_id:userId}, {$pullAll:{following:followingUserId}});
                } else {
                    return UserModel.update({_id:userId}, {$addToSet:{following:followingUserId}});
                }
            }, function(error){
                console.log("Error: "+error);
            });
    }

    function createUser(user) {
        console.log("rc");
        console.log(user);
        return UserModel
            .create(user);
    }

    function findAllUsers() {
        return UserModel
            .find();
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    $set:user
                }
            );
    }

    function deleteUser(userId) {
        return UserModel
            .remove(
                {
                    _id:userId
                });
    }

    function setModel(_model) {
        model = _model;
    }

};