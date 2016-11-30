/**
 * Created by ghost on 11/29/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server');
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    return api;
    var model = {};

    function createUser(user) {
        return UserModel
            .create(user);
    }

    function findAllWebsitesForUser(userId) {
        return UserModel
            .findUserById(userId)
            .populate("websites")
            .exec();
    }

    function findUserByCredentials(username, password) {
        return UserModel
            .findUser({username:username, password:password});
    }

    function findUserByUsername(username, password) {
        return UserModel
            .findByUserName({username:username});
    }


    function findUserById(userId) {
        return UserModel.findUserById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email
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