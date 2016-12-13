(function () {

    angular
        .module('PPTApp')
        .controller('DetailController', DetailController);
    
    function DetailController($routeParams, MovieService, ReviewService, UserService) {
        console.log("Details conttolee");
        var vm = this;
        vm.movieId = $routeParams.movieId;

        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.toggleLike = toggleLike ;

        function init() {

            vm.review = {
                title: "",
                timestamp: Date.now(),
                reaction: 'Neutral'
            };

            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                            if (response.data) {
                                vm.user = response.data;
                            }
                        });
                    }
                });

            getMovieStats();
            getMovieDetails();
        }

        if (vm.movieId) {
            console.log(vm.movieId);
            init();
        }

        function getMovieStats() {
            vm.likes = 0;
            vm.reviewCount = 0;
            if(vm.likes)
                vm.likes = vm.likes.length;
            if(vm.reviews)
                vm.reviewCount = vm.reviews.length;

        }

        function getMovieDetails() {
            MovieService
                .searchMovieById(vm.movieId)
                .then(function (response) {
                    var movie = response.data;
                    console.log(movie);
                    vm.movie = movie;
                    vm.Actors = movie.Actors.split(',');
                    console.log(response.data);
                    findAllReviewsForMovieId();
                });
        }

        function findAllReviewsForMovieId() {
            ReviewService
                .searchAllReviewsByMovieId(vm.movieId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews = response.data;
                    } else {
                        console.log("SDa");

                    }
                });
            }

        function addReview(review) {
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews.push(response.data);
                        getMovieStats();
                        return MovieService.addMovie(vm.movie);
                    }
                }, function (err) {
                    console.log(err);
                })
                .then(function (response) {
                }, function (error) {
                    console.log(error);
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "_id": vm.reviews[index]["_id"],
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "timestamp": vm.reviews[index]["timestamp"],
                "movieId": vm.reviews[index]["movieId"],
                "_user": vm.reviews[index]["_user"],
                "rating": vm.reviews[index]["rating"]
            };
            vm.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review._id, review)
                .then(function (response) {
                    vm.reviews[vm.selectedIndex] = review;
                    vm.selectedIndex = -1;
                    vm.review = {};
                    getMovieStats();
                }, function (err) {
                    console.log(err);
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    vm.reviews.splice(index, 1);
                    vm.selectedIndex = -1;
                    vm.review = {};
                }, function (err) {
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }


        function toggleLike() {
            UserService
                .toggleLike(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.isLiked = true;
                    return MovieService.addMovie(vm.movie);
                }, function (err) {
                })
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });
        }
    }

})();