(function () {

    angular
        .module('PPTApp')
        .factory('UserService', UserService);

    function UserService($rootScope, $http) {


        var api = {
            login: login,
            logout: logout,
            register: register,
            validateLogin:validateLogin,
            setCurrentUser: setCurrentUser,
            deleteUserById: deleteUserById,
            findFollowers: findFollowers,
            findFollowing: findFollowing,
            findFavoriteMovies: findFavoriteMovies,
            findUserById: findUserById,
            followUser:followUser,
            unfollowUser:unfollowUser,
            getCurrentUser: getCurrentUser,
            likeMovie: likeMovie,
            unlikeMovie:unlikeMovie,
            updateUser: updateUser
        };
        return api;
        
        function deleteUserById(userId) {
            var url = "/ppt/user/" + userId;
            return $http.delete(url);
        }

        function findFollowing(userId) {
            var url = "/ppt/user/" + userId + "/following";
            return $http.get(url);
        }

        function validateLogin() {
            return  $http.post("/ppt/validateLogin");
        }

        function findFollowers(userId) {
            var url = "/ppt/user/" + userId + "/followers";
            return $http.get(url);
        }

        function findFavoriteMovies(userId) {
            var url = "/ppt/user/" + userId + "/favorites";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/ppt/user/" + userId;
            return $http.get(url);
        }


        function followUser(userId, followId) {
            var url = "/ppt/user/" + userId + "/follow/" + followId;
            return $http.put(url);
        }

        function unfollowUser(userId, followId) {
            var url = "/ppt/user/" + userId + "/unfollow/" + followId;
            return $http.put(url);
        }

        function getCurrentUser() {
            var url = "/ppt/loggedIn";
            return $http.get(url);
        }


        function likeMovie(userId, movieId) {
            var url = "/ppt/user/" + userId + "/movie/" + movieId + "/likeMovie";
            return $http.put(url);
        }

        function unlikeMovie(userId, movieId) {
            var url = "/ppt/user/" + userId + "/movie/" + movieId + "/unlikeMovie";
            return $http.put(url);
        }

        function login(user) {
            var url = "/ppt/login";
            return $http.post(url, user);
        }
        
        function logout() {
            var url = "/ppt/logout";
            return $http.post(url);
        }
        
        function register(user) {
            console.log(user);
            var url = "/ppt/register";
            return $http.post(url, user);
        }
        
        function setCurrentUser(user) {
            $rootScope.currentUser= user;
        }

        function updateUser(userId, user) {
            var url = "/ppt/user/" + userId;
            return $http.put(url, user);
        }

    }

})();