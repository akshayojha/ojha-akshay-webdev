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
        likeMovie: likeMovie,
        unlikeMovie: unlikeMovie,
        followUser: followUser,
        unfollowUser: unfollowUser,
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

    function unlikeMovie(userId, mid) {
        return UserModel.update({_id:userId}, {$pullAll:{favoriteMovies:[mid]}});
    }
    function likeMovie(userId, mid) {
        return UserModel.update({_id:userId}, {$addToSet:{favoriteMovies:mid}});
    }

    function followUser(userId, followingUserId) {
        return UserModel.update({_id:userId}, {$pullAll:{following:followingUserId}});
    }

    function unfollowUser(userId, followingUserId) {
        return UserModel.update({_id:userId}, {$addToSet:{following:followingUserId}});
    }

    function createUser(user) {

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