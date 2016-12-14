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
        vm.title = $routeParams.title;

        function init() {
            if(vm.title) {
                $location.path("/search/"+vm.title);
                searchMovieByTitle(vm.title);
            }
        }
        init();

        function searchMovieByTitle(title) {
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    if(!result.Search){
                        vm.alert = "No results found";
                        vm.movies =null;}
                    else {
                        vm.alert = null;
                        vm.movies = result.Search;
                    }
                })
                .error(function () {
                    vm.alert = "No results found";
                })
        }
    }
})();