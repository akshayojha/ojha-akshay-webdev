(function () {

    angular
        .module('PPTApp')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            searchAllReviewsByMovieId: searchAllReviewsByMovieId,
            getAllReviewsByUserId: getAllReviewsByUserId,
            addReview: addReview,
            deleteReview: deleteReview,
            updateReview: updateReview
        };
        return api;

        function searchAllReviewsByMovieId(movieId) {
            var url = "/ppt/movie/" + movieId + "/reviews";
            return $http.get(url);
        }

        function getAllReviewsByUserId(userId) {
            var url = "/ppt/user/" + userId + "/reviews";
            return $http.get(url);
        }


        function addReview(userId, movieId, review) {
            var url = "/ppt/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/ppt/review/" + reviewId;
            return $http.delete(url);
        }

        function updateReview(reviewId, review) {
            var url = "/ppt/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();