/**
 * Created by ghost on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        function login(user) {
            if(user) {
                UserService.findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    var user = response.data;
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

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.cancel =  cancel;
        function register(user) {
            if (user && user.username) {
                if (user.password === user.verifyPassword) {
                    UserService.createUser(user)
                        .then(function (response) {
                            var user =  response.data;
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
                .findUserByID(vm.userId)
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
            $location.url("/login");
        }
    }
})();