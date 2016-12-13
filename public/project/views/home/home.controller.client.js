/**
 * Created by ghost on 12/12/16.
 */
(function () {
    angular
        .module("PPTApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService, $routeParams, $location) {
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        var title = $routeParams.title;

        function init() {
            if(title) {
                $location.path("/search"+title);
                searchMovieByTitle(title);
            }
        }
        init();

        function searchMovieByTitle(title) {
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    vm.movies = result.Search;
                })
                .error(function () {
                })
        }
    }
})();