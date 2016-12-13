/**
 * Created by ghost on 12/12/16.
 */
(
    function () {
        angular
            .module("PPTApp")
            .controller("ProfileController", ProfileController);
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

        function getFollowers() {
            $location.url("/user/"+vm.userId+"/website");
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                });
        }
}})();