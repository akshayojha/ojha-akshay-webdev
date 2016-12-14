/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('FollowersController', FollowersController);

    function FollowersController($routeParams, UserService) {
        var vm = this;

        vm.navUserId = $routeParams.uid;
        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findFollowers(vm.navUserId);
                    }
                    }, function (err) {
                    console.log(err);
                    }
                )
                    .then(function (resp) {
                        if (resp) {
                            vm.followers = resp.data;
                            UserService
                                .findUserById(vm.navUserId)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user) {
                                        vm.navUser = user;
                                    }
                    }, function (error) {

                        vm.followers = null;
                    })
                }
        });
    }
        init();

    }})();