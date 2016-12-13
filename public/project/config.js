/**
 * Created by ghost on 10/19/16.
 */

(function () {

    angular
        .module('PPTApp')
        .config(Config);

    function Config($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {validateLogin: validateLogin}

            })
            .when("/user/:uid", {
                templateUrl: "views/user/critic-profile.view.client.html",
                controller: "CriticProfileController",
                controllerAs: "model",
                resolve: {isCritic: isCritic}
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {validateLogin: validateLogin}
            })
            .when("/details/:movieId", {
                templateUrl: "views/details/details.view.client.html",
                controller: "DetailController",
                controllerAs: "model",
                //resolve: {validateLogin: validateLogin}
            })
            .when("/user/:uid/followers", {
                templateUrl: "views/user/followers.view.client.html",
                controller: "FollowersController",
                controllerAs: "model",
                resolve: {validateLogin: validateLogin}

            })
            .when("/user/:uid/following", {
                templateUrl: "views/user/followers.view.client.html",
                controller: "FollowingController",
                controllerAs: "model",
                resolve: {validateLogin: validateLogin}

            })
            .when("/user/:uid/reviews", {
                templateUrl: "views/user/reviews.view.client.html",
                controller: "ReviewsController",
                controllerAs: "model",
                resolve: {isCritic: isCritic}

            })
            .when("/user/:uid/favorites", {
                templateUrl: "views/user/favorites.view.client.html",
                controller: "FavoritesController",
                controllerAs: "model",
                resolve: {validateLogin: validateLogin}

            })
            .otherwise({
                redirectTo: "/login"
            });

        function validateLogin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .validateLogin()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                });
            return deferred.promise;
        }

        function isCritic(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .isCritic()
                .then(function (response) {
                    var user = response.data;

                    if (user) {
                        if (user && user.role == 'critic') {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                        else {
                            $rootScope.currentUser = null;
                            $location.url("/login");
                            deferred.reject();
                        }
                    }
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }
                });

            return deferred.promise;
        }
    }
})();