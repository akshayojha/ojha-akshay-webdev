/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;

        vm.logout = logout;
        vm.home = home;
        vm.login = login;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                                if (response.data) {
                                    vm.user = response.data;
                                    $location.url("/user");
                                }
                            });
                    }
                });
        }

        init();

        function login() {
            $location.url("#/login");
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                });
        }

        function home() {
            $location.url("#/");
        }

    }

})();