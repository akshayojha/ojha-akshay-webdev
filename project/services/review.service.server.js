/**
 * Created by ghost on 12/10/16.
 */
module.exports = function (app, model) {

    var movieModel = model.movieModel;
    var reviewModel = model.reviewModel;
    var userModel = model.userModel;
    var q = require('q');

    app.post('/ppt/user/:uid/movie/:mid', addReview);
    app.get('/ppt/movie/:mid/reviews', findAllReviewsForMovieId);
    app.get('/ppt/user/:uid/reviews', findAllReviewsForUserId);
    app.put('/ppt/review/:rid', updateReview);
    app.delete('/ppt/review/:rid', deleteReview);

    function addReview(req, res) {
        var userId = req.params.uid;
        var mid = req.params.mid;
        var review = req.body;
        reviewModel
            .addReview(userId, mid, review)
            .then(function (review) {
                res.json(review);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllReviewsForMovieId(req, res) {
        var mid = req.params.mid;
        reviewModel
            .findAllReviewsForMovieId(mid)
            .then(function (reviews) {
                res.json(reviews);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllReviewsForUserId(req, res) {
        var userId = req.params.uid;
        reviewModel
            .findAllReviewsByUserId(userId)
            .then(function (reviews) {
                var promiseArray = [];
                var result = [];
                reviews.forEach(function (review, index, array) {
                    promiseArray
                        .push(movieModel
                            .findMovieById(review.movieId)
                            .then(function (movie) {
                                if (movie) {
                                    var jsonString = JSON.stringify(review);
                                    var jsonStringNew = jsonString;
                                    var newReview = JSON.parse(jsonStringNew);
                                    newReview.movie = movie;
                                    result.push(newReview);
                                }
                            }, function (err) {
                                console.log(err);
                            }));
                });
                q.all(promiseArray)
                    .then(function () {
                        res.json(result);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var review = req.body;
        var reviewId = req.params.rid;
        reviewModel
            .updateReview(reviewId, review)
            .then(function (resp) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.rid;
        reviewModel
            .deleteReview(reviewId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

};