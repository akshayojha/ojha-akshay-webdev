/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('ReviewsController', ReviewsController);

    function ReviewsController($routeParams, UserService, ReviewService) {

        var vm = this;
        vm.navUserId = $routeParams.uid;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.following = false;
        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return ReviewService.getAllReviewsByUserId(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                    for(var i = 0; vm.user && i<vm.user.following.length; ++i) {
                                        if(vm.user.following[i] === vm.navUserId) {
                                            vm.following = true;
                                        }
                                    }
                                }
                            });
                    }
                });
        }
        init();

        function followUser() {
            UserService
                .followUser(vm.user._id, vm.navUserId)
                .then(
                    function (reponse) {
                        vm.following = true;
                        alert("Added to the list");
                    }, function (erro) {
                        alert("Cant add to the list");
                    }
                )
        }

        function unfollowUser() {
            UserService
                .unfollowUser(vm.user._id, vm.navUserId)
                .then(
                    function (reponse) {
                        vm.following = false;
                        alert("Removed from the list");
                    }, function (erro) {
                        alert("Cant remove from the list");
                    }
                )
        }
    }

})();