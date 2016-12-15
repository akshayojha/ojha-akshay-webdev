(function () {

    angular
        .module('PPTApp')
        .controller('DetailController', DetailController);
    
    function DetailController($routeParams, MovieService, ReviewService, UserService) {
        var vm = this;
        vm.movieId = $routeParams.movieId;
        vm.title = $routeParams.title;
vm.isEditable =false;
        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.toggleLike = toggleLike;
        vm.liked = false;
        vm.isCritic = false;

        function init() {

            vm.review = {
                title: "",
                timestamp: Date.now(),
                description: ""
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
                                if(vm.user.role == 'critic')
                                    vm.isCritic = true;
                            }

                            }, function (err) {
                                console.log(err);
                            });
                    }
                });
            for(var i = 0; vm.user && i<vm.user.favoriteMovies.length; ++i) {
                if(vm.user.favoriteMovies[i] === vm.movieId) {
                    vm.liked = true;
                }
            }
            getMovieDetails();
        }

        if (vm.movieId) {
            init();
        }

        function getMovieDetails() {
            MovieService
                .searchMovieById(vm.movieId)
                .then(function (response) {
                    var movie = response.data;
                    vm.movie = movie;
                    vm.Actors = movie.Actors.split(',');
                    findAllReviewsForMovieId();
                });
        }

        function findAllReviewsForMovieId() {
            ReviewService
                .searchAllReviewsByMovieId(vm.movieId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews = response.data;
                        findUserByReviewUserId();
                    } else {

                    }
                });
            }

        function addReview(review) {
            if (vm.user && vm.user.role === 'critic') {
                ReviewService
                    .addReview(vm.user._id, vm.movieId, review)
                    .then(function (response) {
                        if (response.data) {
                            vm.reviews.push(response.data);
                            console.log(response.data);
                            findUserByReviewUserId();
                            return MovieService.addMovie(vm.movie);
                        }
                    }, function (err) {
                        console.log(err);
                    })
                    .then(function (response) {
                        console.log("worked");
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                alert("You need to login as Critic to submit review");
            }
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
            console.log(review);
            ReviewService
                .updateReview(review._id, review)
                .then(function (response) {
                    vm.reviews[vm.selectedIndex] = review;
                    vm.selectedIndex = -1;
                    vm.review = {};
                    findUserByReviewUserId();

                }, function (err) {
                    console.log(err);
                });
        }

        function deleteReview(index) {
            if (vm.user && vm.user.role === 'critic') {
                var reviewId = vm.reviews[index]._id;
                ReviewService
                    .deleteReview(reviewId)
                    .then(function (response) {
                        vm.reviews.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.review = {};
                    }, function (err) {
                    });
            } else {
                alert("Please login to modify existing reviews");
            }
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }


        function toggleLike() {
            if(vm.liked) {
                console.log("liking");
                UserService
                    .likeMovie(vm.user._id, vm.movieId)
                    .then(function (response) {
                        return MovieService.addMovie(vm.movie);
                    }, function (err) {
                    })
                    .then(function (response) {
                        vm.liked = false;
                    }, function (err) {
                        console.log(err);
                    });
            }else {

                console.log("Unliking");
                UserService
                    .unlikeMovie(vm.user._id, vm.movieId)
                    .then(function (response) {
                        return MovieService.addMovie(vm.movie);
                    }, function (err) {
                    })
                    .then(function (response) {
                        vm.liked = true;
                        console.log(vm.liked);
                    }, function (err) {
                        console.log(err);
                    });

            }
        }

        function findUserByReviewUserId() {
            vm.reviews.forEach(function (element, index, array) {
                UserService.findUserById(vm.reviews[index]._user)
                    .then(function (response) {
                        if (response.data) {
                             console.log(response.data.username);
                            vm.reviews[index].username = response.data.username;
                            if (vm.reviews[index]._user === vm.user._id)
                                vm.reviews[index].isEditable = true;
                            else
                                vm.reviews[index].isEditable = false;
                        }
                    });
            });
        }
    }

})();