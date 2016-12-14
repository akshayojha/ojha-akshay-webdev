/**
 * Created by ghost on 12/12/16.
 */
(
    function () {
        angular
            .module("PPTApp")
            .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.followers = getFollowers;
        vm.reviews = getReviews;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    $rootScope.currentUser = response.data;
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
                        alert("Updated information successfully");
                    }, function (error) {
                        alert("Error: cant update the user");
                    });
            } else {
                alert("Error Unable to update user information");
            }
        }

        function getFollowers() {
            $location.url("/user/"+vm.userId+"/followers");
        }

        function getReviews() {
            $location.url("/user/"+vm.userId+"/reviews");
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/search");
                });
        }
}})();