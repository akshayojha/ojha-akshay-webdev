/*
 * Created by ghost on 11/6/16.
 */

module.exports = function(app, model) {

    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var session = require('express-session');
    var cookieParser  = require('cookie-parser');

    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var movieModel = model.movieModel;
    var userModel = model.userModel;



    app.use(session({
        secret: 'session-secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var ls = new LocalStrategy(localStrategy);
    var fs = new FacebookStrategy(facebookConfig, facebookStrategy);

    passport.use(ls);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post("/ppt/user", createUser);
    app.get("/ppt/user", findUser);
    app.get("/ppt/user/:userID", findUserByID);
    app.put("/ppt/user/:userID", updateUser);
    app.delete("/ppt/user/:userID", deleteUser);
    app.post('/ppt/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/ppt/validateLogin', validateLogin);
    app.post('/ppt/logout', logout);
    app.post ('/ppt/register', register);
    app.get('/ppt/user/:uid/follows', getFollowers);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '#/profile',
            failureRedirect: '/#/login'
        }));



    passport.use(fs);


    function serializeUser(user, done) {
        done(null, user);
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


    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByEmail(profile.emails[0].value)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            email: profile.emails[0].value,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            facebook: {
                                token: token,
                                id: profile.id
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
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
        if (req.isAuthenticated()) {
            req.user;
        }
    }

    function register(req, res) {
        var user= req.body;
        userModel
            .findUserByEmail(req.body.email)
            .then(
                function (user) {
                    if(user) {
                        res.status(400).send("Already exists");
                    } else {
                        user.password =bcrypt.hashSync(user.password);
                        return userModel
                            .createUser(user)
                            .then(
                                function (user) {
                                    req.login(user, function (err) {
                                        if(err) {
                                            res.sendStatus(400).send(err);
                                        }else{
                                            res.json(user);
                                        }
                                    })
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }

                            );
                    }
                }
            )
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
};