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
        vm.registerCritic= registerCritic;

        vm.cancel = cancel;
    function register(user) {
        if (user && user.username && user.password && user.email && user.firstName && user.lastName) {
            if (user.password === user.verifyPassword) {
                UserService.register(user)
                    .then(function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        console.log(user);
                        $location.url("/user");
                    }, function (error) {
                        alert("Username already exists!");
                    });
            } else {
                alert("Please verify the password!");
            }
        } else {
            alert("Error invalid input given!");
        }
    }

        function registerCritic(user) {
            if (user && user.username && user.password && user.email && user.firstName && user.lastName) {
                if (user.password === user.verifyPassword) {
                    user.role = 'critic';
                    UserService.register(user)
                        .then(function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            console.log(user);
                            $location.url("/user");
                        }, function (error) {
                            alert("Username already exists!");
                        });
                } else {
                    alert("Please verify the password!");
                }
            } else {
                alert("Error invalid input given!");
            }
        }
    function cancel() {
        $location.url("/login");
    }
}})();