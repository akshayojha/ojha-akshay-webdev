/**
 * Created by ghost on 11/6/16.
 */

module.exports = function(app, model) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserByID);
    app.put("/api/user/:userID", updateUser);
    app.delete("/api/user/:userID", deleteUser);

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password){
            findUserByCredentials(username,password, res);
            return;
        }
        if(username){
            findUserByUsername(username, res);
            return;
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        model
            .userModel
            .createUser(newUser)
            .then(function (resp) {
                res.send(resp)
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function findUserByID(req, res) {
        var id = req.params.userID;
        model
            .userModel
            .findUserById(id)
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

    function findUserByUsername(username, res) {
        for (var index in users) {
            if(users[index].username === username) {
                res.send(users[index]);
                return;
            }
        }
        res.sendStatus(404);
    }
    function findUserByCredentials(username, password, res) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateUser(req, res) {
        var userID = req.params.uid;
        var user = req.body;
        model
            .userModel
            .updateUser(userID, user)
            .then(
                function (resp) {
                    res.sendStatus(200);
                }, function (error) {
                    res.sendStatus(400);
                }
            );
    }
    function deleteUser(req, res) {
        var userID = req.params.uid;
        model
            .userModel
            .deleteUser(userID)
            .then(
                function (resp) {
                  res.sendStatus(200);
              }, function (error) {
                    res.sendStatus(400);
                }
            );
    }
};
