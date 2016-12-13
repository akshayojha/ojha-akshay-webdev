/**
 * Created by ghost on 12/12/16.
 */
(function () {
    angular
        .module("PPTApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService, $rootScope) {
    var vm = this;
    vm.register = register;
    vm.cancel = cancel;
    function register(user) {
        if (user && user.username && user.password && user.email && user.firstName && user.lastName) {
            if (user.password === user.verifyPassword) {
                UserService.register(user)
                    .then(function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    }, function (error) {
                        vm.alert("Error creating new user");
                    });
            }
        } else {
            vm.alert("Error invalid username entered");
        }
    }

    function cancel() {
        $location.url("/login");
    }
}})();