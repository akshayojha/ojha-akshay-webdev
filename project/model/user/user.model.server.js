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
        removeFollowingUser: removeFollowingUser,
        addFollowingUser: addFollowingUser,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowers: findAllFollowers,
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

    function unfollowUser(userId, followingUserId) {
        console.log("Roudn 1 unflolgin");
        return UserModel.update({_id:userId}, {$pullAll:{following:[followingUserId]}});
    }

    function removeFollowingUser(userId, followingUserId) {
        return UserModel.update({_id:userId}, {$pullAll:{followers:[followingUserId]}});
    }



    function addFollowingUser(userId, followingUserId) {
        return UserModel.update({_id:userId}, {$addToSet:{followers:followingUserId}});
    }

    function followUser(userId, followingUserId) {
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

    function findAllFollowingUsers(userIds) {
        return UserModel.find({_id: {$in: userIds}});
    }

    function findAllFollowers(userIds) {
        return UserModel.find({_id: {$in: userIds}});
    }
    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        console.log(user);
        delete user._id;
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