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
                    if (response && vm.user) {
                        var reviews = response.data;
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
                        vm.alert = "You are now following this user";
                    }, function (erro) {
                        vm.alert = "Cant follow this user";
                    }
                )
        }

        function unfollowUser() {
            UserService
                .unfollowUser(vm.user._id, vm.navUserId)
                .then(
                    function (reponse) {
                        vm.following = false;
                        vm.alert = "You are now not following this user";
                    }, function (erro) {
                        console.log(erro);
                        vm.alert ="Cant unfollow this user";
                    }
                )
        }
    }

})();