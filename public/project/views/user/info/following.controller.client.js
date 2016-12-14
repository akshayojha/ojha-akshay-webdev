/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('FollowingController', FollowingController);

      function FollowingController($routeParams, UserService) {
        var vm = this;
        vm.navUserId = $routeParams.uid;
        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findFollowing(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.users= users;
                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }
        init();
    }

})();