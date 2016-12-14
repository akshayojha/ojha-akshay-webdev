/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('FavoritesController', FavoritesController);

    function FavoritesController($routeParams, UserService, MovieService) {

        var vm = this;
        var getMovieTitle = getMovieTitle;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        UserService.findFavoriteMovies(user._id)
                            .then(function (resp) {
                                vm.movies = resp.data;
                                getMovieTitle();
                            }, function (error) {
                                vm.movies = null;
                            })
                    }
                });
        }
        function getMovieTitle() {
            vm.movies.forEach(function (element, index, array) {
                MovieService.findMovieById(vm.movies[index].movieId)
                    .then(function (response) {
                        if (response.data) {
                            vm.movies[index].title = response.data.title;
                        }
                    });
            });
        }
        init();
    }
})();