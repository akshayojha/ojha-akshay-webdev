/*
* Created by ghost on 11/6/16.
*/

module.exports = function(app, model) {

    app.post("/ppt/movie", addMovie);
    app.get("/ppt/movie/:mid", findMovieByID);

    function findMovieByID(req, res) {
        var id = req.params.mid;
        model
            .movieModel
            .findMovieById(id)
            .then(function (resp) {
                if (resp) {
                    res.send(resp)
                } else {
                    res.sendStatus(404);
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            });
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