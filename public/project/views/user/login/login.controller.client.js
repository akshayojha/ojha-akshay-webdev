/**
 * Created by ghost on 12/12/16.
 */
(function () {
    angular
        .module('PPTApp')
        .controller("LoginController", LoginController);
    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = function (email, password) {
            if (email && password) {
                var user = {
                    username: email,
                    password:password
                };
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var current =  response.data;
                            if (current && current._id){
                                $rootScope.currentUser = current;
                                $location.url("/profile");
                            } else {
                                vm.alert("The credentials don't match");
                            }
                        }, function (error) {
                            vm.alert("The credentials don't match");
                        }
                    )
            }
        };
    }
})();