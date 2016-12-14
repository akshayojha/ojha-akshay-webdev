(function () {

    angular
        .module('PPTApp')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        var baseUrl = "/ppt/movie";

        var api = {
            searchMovieById: searchMovieByImdbID,
            addMovie: addMovie,
            searchMovieByTitle: searchMovieByTitle,
            getMovieDetailsById:getMovieDetailsById,
            findMovieById: findMovieById
        };
        return api;
        function findMovieById(mid) {
            var url = "/ppt/movie/" + mid;
            return $http.get(url);
        }
        function addMovie(movie) {
            return $http.post(baseUrl, movie);
        }
        function searchMovieByTitle(title) {
            var url = "https://omdbapi.com/?s=" + title;
            return $http.get(url);
        }

        function searchMovieByImdbID(imdbID) {
            console.log(imdbID);
            var url = "https://omdbapi.com/?i=" + imdbID;
            return $http.get(url);
        }


        function getMovieDetailsById(movieId) {
            var url = baseUrl + "/details/" + movieId;
            return $http.get(url);
        }
    }

})();