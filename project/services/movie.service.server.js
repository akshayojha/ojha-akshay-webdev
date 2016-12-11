/*
* Created by ghost on 11/6/16.
*/

module.exports = function(app, model) {

    app.get("/ppt/movie/:mid", findMovieById);

    function findMovieById(req, res) {
        var movieId = req.params.mid;
        model
            .movieModel
            .findMovieById(movieId)
            .then(
                function (movies) {
                    res.send(movies);
                }, function (error) {
                    res.sendStatus(404);
                    res.send(error);
                }
            );
    }
};