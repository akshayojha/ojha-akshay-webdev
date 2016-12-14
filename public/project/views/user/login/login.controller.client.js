/**
 * Created by ghost on 12/12/16.
 */
(function () {
    angular
        .module('PPTApp')
        .controller("LoginController", LoginController);
    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.login = login;
        function init() {

        }
        init();
        function register() {
            $location.url("/register");
        }
        function login (user) {
            if(user.username && user.password) {
                UserService.login(user)
                    .then(function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        console.log(user);
                        $location.url("/search");
                    }, function (error) {
                        console.log("Unable to login");
                    });
            } else {
                console.log("Error Invalid input");
            }
        };
    }
})();