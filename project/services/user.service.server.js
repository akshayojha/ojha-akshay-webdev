/*
 * Created by ghost on 11/6/16.
 */

module.exports = function(app, model) {

    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var session = require('express-session');
    var cookieParser  = require('cookie-parser');

    var LocalStrategy    = require('passport-local').Strategy;

    var userModel = model.userModel;

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/ppt/loggedIn', loggedIn);
    app.put('/ppt/user/:uid/movie/:mid/unlikeMovie', unlikeMovie);
    app.put('/ppt/user/:uid/movie/:mid/likeMovie', likeMovie);
    app.put('/ppt/user/:uid/unfollow/:followingUserId', unfollowUser);
    app.put('/ppt/user/:uid/follow/:followingUserId', followUser);
    app.get('/ppt/user/:uid/following', findAllFollowingUsers);
    app.get('/ppt/user/:uid/followers', findAllFollowers);
    app.get('/ppt/user/:uid/favorites', findAllLikedMovies);

    app.post("/ppt/user", createUser);
    app.get("/ppt/user", findUser);
    app.get("/ppt/user/:userID", findUserByID);
    app.put("/ppt/user/:userID", updateUser);

    app.delete("/ppt/user/:userID", deleteUser);
    app.post('/ppt/login', passport.authenticate('local'), login);
    app.post('/ppt/validateLogin', validateLogin);
    app.post('/ppt/logout', logout);
    app.post ('/ppt/register', register);
    app.get('/ppt/user/:uid/follows', getFollowers);


    function findAllFollowingUsers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findFollowing(user.following);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findFollowers(user.followers);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllLikedMovies(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return model.movieModel
                    .findFavoriteMovies(user.favoriteMovies);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (movies) {
                res.json(movies);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }
    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }




    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (error) {
                    res.sendStatus(400).message(error);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if (username && password) {
            findUserByCredentials(username, password, res);
            return;
        }
        if (username) {
            findUserByUsername(username, res);
            return;
        }
        else {
            res.json(req.user);
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
        console.log(id);
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
        var password = bcrypt.compareSync(password);
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
    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function updateUser(req, res) {
        var userID = req.params.uid;
        var user = req.body;
        model
            .userModel
            .updateUser(userID, user)
            .then(
                function (resp) {
                    console.log("Rer");
                    console.log(user);
                    res.send(user).sendStatus(200);
                }, function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function isCritic(user) {
        return user.role.indexOf('critic');
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

    function login(req, res) {
        res.json(req.user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function validateLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
         userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (error) {
                if (error.code === 11000)
                    res.status(409).send("Already exists");
                else
                    res.status(400).send(error);
            });
    }

    function getFollowers(req, res) {
        var userId = req.params[uid];
        userModel
            .findUserByID(userId)
            .then(
                function (user) {
                    res.json(user.followers);
                },
                function(error){
                    console.log(error);
                });
    }

    function likeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .likeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    };


    function unlikeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .unlikeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    };
    function followUser(req, res) {
        var userId = req.params['uid'];
        var followId = req.params['followingId'];
        userModel
            .followUser(userId, followId)
            .then(function (stats) {
                return userModel
                    .followUser(followId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unfollowUser(req, res) {
        var userId = req.params['uid'];
        var unfollowId = req.params['followingId'];
        console.log(userId);
        console.log(unfollowId);
        userModel
            .unfollowUser(userId, unfollowId)
            .then(function (stats) {
                return userModel
                    .unfollowUser(unfollowId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }
};