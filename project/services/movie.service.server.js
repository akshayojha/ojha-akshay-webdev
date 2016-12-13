/*
* Created by ghost on 11/6/16.
*/

module.exports = function(app, model) {

    app.get("/ppt/movie/:mid", findMovieById);

    app.post("/ppt/movie", addMovie);

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
    function addMovie(req, res) {
        var movie = req.body;
        model
            .movieModel
            .addMovie(movie)
            .then(function (movie) {
                res.json(movie);
            }, function (err) {
                res.sendStatus(200);
            });
    }
};