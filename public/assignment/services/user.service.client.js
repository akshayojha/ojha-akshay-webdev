/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("UserService", UserService);

    function UserService($http) {

        var userURL = "/api/user";

        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser:updateUser,
            deleteUser:deleteUser,
            login:login,
            validateLogin:validateLogin,
            logout:logout,
            register:register,
            findCurrentUser:findCurrentUser
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return  $http.post("/api/logout");
        }

        function validateLogin() {
            return  $http.post("/api/validateLogin");
        }

        function login(user) {
            return  $http.post("/api/login",user);
        }

        function findCurrentUser() {
            var url = '/api/user';
            return $http.get(url);
        }

        function createUser(user) {
            return $http.post(userURL, user);
        }

        function findUserByID(id) {
            return $http.get(userURL+"/"+id);
        }

        function findUserByUsername(username) {
            return $http.get(userURL+"?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get(userURL+"?username="+username+"&password="+password);
        }

        function updateUser(userID, user) {
            return $http.put(userURL+"/"+userID, user);
        }
        function deleteUser(userID) {
            return $http.delete(userURL+"/"+userID);
        }
    }
})();