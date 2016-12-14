/*
* Created by ghost on 11/6/16.
*/

module.exports = function(app, model) {

    app.post("/ppt/movie", addMovie);

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