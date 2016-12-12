/**
 * Created by ghost on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        function login(user) {
            if(user) {
                UserService.login(user.username, user.password)
                .then(function(response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
                }, function (error) {
                    console.log("Unable to login");
                });
            } else {
                console.log("Error Invalid input");
            }
        }
        function register() {
           $location.url("/register")
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.cancel =  cancel;
        function register(user) {
            if (user && user.username) {
                if (user.password === user.verifyPassword) {
                    UserService.register(user)
                        .then(function (response) {
                            var user =  response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        }, function (error) {
                            console.log("Error creating new user");
                        });
                }
            } else {
                console.log("Error invalid username entered");
            }
        }

        function cancel() {
            $location.url("/login");
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                }, function (error) {
                    console.log("Error: Unable to find user");
                });
        }

        init();
        function updateUser(user) {
            if (user) {
                UserService.updateUser(vm.userId, user)
                    .then(function (response) {
                        console.log("Updated");
                    }, function (error) {
                        console.log("Error: cant update the user");
                    });
            } else {
                console.log("Error Unable to update user information");
            }
        }

        function website() {
            $location.url("/user/"+vm.userId+"/website");
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                });
        }
    }
})();