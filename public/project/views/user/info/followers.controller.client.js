/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('FollowersController', FollowersController);

    function FollowersController($routeParams, UserService, $rootScope) {
        var vm = this;

        // vm.follow = follow;
        // vm.unfollow = unfollow;


        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $rootScope.currentUser = user;
                        vm.user = user;
                        UserService.findFollowers(user._id)
                            .then(function (resp) {
                                vm.followers = resp.data;
                            }, function (error) {
                                vm.followers = null;
                            })
                    }
                });
        }
        init();

        // function follow(index) {
        //     var userId = vm.users[index]._id;
        //     UserService
        //         .followUser(vm.user._id, userId)
        //         .then(function (response) {
        //             var status = response.data;
        //             console.log(status);
        //             vm.users[index].alreadyFollowing = true;
        //         }, function (err) {
        //             console.log(err);
        //             vm.users[index].alreadyFollowing = false;
        //         });
        // }
        //
        // function unfollow(index) {
        //     var userId = vm.users[index]._id;
        //     UserService
        //         .unfollowUser(vm.user._id, userId)
        //         .then(function (response) {
        //             var status = response.data;
        //             console.log(status);
        //             vm.users[index].alreadyFollowing = false;
        //         }, function (err) {
        //             console.log(err);
        //             vm.users[index].alreadyFollowing = true;
        //         });
        // }

    }
})();