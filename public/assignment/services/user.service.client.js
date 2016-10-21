/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser:updateUser,
            deleteUser:deleteUser
        };
        return api;
        function createUser(user) {
            var newUser = {
                _id: (new Date()).getTime()+"",
                username : user.username,
                password: user.password,
                firstName : user.firstName,
                lastName: user.lastName
            };
            users.push(newUser);
            console.log(users);
            return newUser;
        }

        function findUserByID(id) {
            for (var index in users) {
                if(users[index]._id === id) {
                    return users[index];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var index in users) {
                if(users[index].username === username) {
                    return users[index];
                }
            }
            return null;
        }
        function findUserByCredentials(username, password) {
            for (var index in users) {
                if(users[index].username === username && users[index].password === password) {
                    return users[index];
                }
            }
            return null;
        }

        function updateUser(userID, user) {
            for (var index in users) {
                var oldUser = users[index];
                if(oldUser._id === userID) {
                    oldUser['firstName'] = user['firstName'];
                    oldUser['lastName'] = user['lastName'];
                    oldUser['email'] =user['email'];
                    return true;
                }
            }
            return false;
        }
        function deleteUser(userID) {
            for (var index in users) {
                if(users[index]._id === userID) {
                    users.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();