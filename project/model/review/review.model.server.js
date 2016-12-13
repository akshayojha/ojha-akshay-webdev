/**
 * Created by ghost on 12/10/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('reviewModel', ReviewSchema);

    var api = {
        createReview: createReview,
        findAllReviewsByMovieId: findAllReviewsByMovieId,
        findAllReviewsByUserId: findAllReviewsByUserId,
        findReviewById:findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview,
        setModel: setModel
    };

    return api;
    var model = {};

    function createReview(userId, mid, review) {
        review._user = userId;
        review.movieId = mid;
        console.log(review);
        return ReviewModel.create(review);
    }

    function findAllReviewsByMovieId(movieId) {
        return ReviewModel.find({movieId: movieId});
    }

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({_user: userId});
    }

    function findReviewById(reviewId) {
        return ReviewModel.findById(reviewId);
    }

    function updateReview(reviewId, review) {
        review.timestamp = Date.now();
        return ReviewModel.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }

    function setModel(_model) {
        model = _model;
    }

};