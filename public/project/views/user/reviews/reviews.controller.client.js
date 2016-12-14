/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('ReviewsController', ReviewsController);

    function ReviewsController($routeParams, UserService, ReviewService) {

        var vm = this;
        vm.navUserId = $routeParams.userId;

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
                                }
                            });
                    }
                });
        }
        init();

    }

})();