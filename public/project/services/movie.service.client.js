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
            getMovieDetailsById:getMovieDetailsById
        };
        return api;
        function addMovie(movie) {
            return $http.post(baseUrl, movie);
        }
        function searchMovieByTitle(title) {
            var url = "http://omdbapi.com/?s=" + title;
            return $http.get(url);
        }

        function searchMovieByImdbID(imdbID) {
            console.log(imdbID);
            var url = "http://omdbapi.com/?i=" + imdbID;
            return $http.get(url);
        }


        function getMovieDetailsById(movieId) {
            var url = baseUrl + "/details/" + movieId;
            return $http.get(url);
        }
    }

})();