/**
 * Created by ghost on 11/6/16.
 */

module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

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

        // Check if username already in use
        for (var index in users) {
            if(newUser.username === users[index]) {
                res.sendStatus(404);
                return;
            }
        }
        newUser._id= (new Date()).getTime()+"";
        users.push(newUser);
        res.send(newUser);
    }

    function findUserByID(req, res) {
        var id = req.params.userID;
        for (var index in users) {
            if(users[index]._id === id) {
                res.send(users[index]);
                return;
            }
        }
        res.sendStatus(404);
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
        for (var index in users) {
            if(users[index].username === username && users[index].password === password) {
                res.send(users[index]);
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userID = req.params.uid;
        var user = req.body;
        for (var index in users) {
            var oldUser = users[index];
            if(oldUser._id === userID) {
                oldUser['firstName'] = user['firstName'];
                oldUser['lastName'] = user['lastName'];
                oldUser['email'] =user['email'];
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
    function deleteUser(req, res) {
        var userID = req.params.uid;
        for (var index in users) {
            if(users[index]._id === userID) {
                users.splice(index, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(400);
    }
};
