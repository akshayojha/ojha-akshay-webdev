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
                user = UserService.findUserByCredentials(user.username, user.password);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            } else {
                vm.alert ="Error Invalid input";
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
                    user = UserService.createUser(user);
                    if (user) {
                        $location.url("/user/"+user._id);
                    } else {
                        vm.alert = "Error creating new user";
                    }
                }
            } else {
                vm.alert = "Error invalid username entered"
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
            vm.user = UserService.findUserByID(vm.userId)
        }

        init();
        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if (user) {
                vm.success = "Update successful";
            } else {
                vm.alert = "Error Unable to update user information";
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