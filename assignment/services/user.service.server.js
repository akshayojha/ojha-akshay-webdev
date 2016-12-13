/**
 * Created by ghost on 11/6/16.
 */

module.exports = function(app, model) {

    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var session = require('express-session');
    var cookieParser  = require('cookie-parser');
    var userModel = model.userModel;
    var LocalStrategy    = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    app.use(session({
        secret: 'this is the secret',
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

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserByID);
    app.put("/api/user/:userID", loggedInAndSelf, updateUser);
    app.delete("/api/user/:userID", loggedInAndSelf, deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/validateLogin', validateLogin);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;
        if(loggedIn && self){
            next();
        } else{
            send.sendStatus(400).message("You are not authorized to perform this action.");
        }
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
        else{
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
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            email: profile.email?profile.emails[0].value:"",
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

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.createUser(newGoogleUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(bcrypt.compareSync(password, user.password));
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("local strategy");
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (error) {

                    res.sendStatus(400).message(error);
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
    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin){
            res.json(req.user);
        }else{
            res.send('0');
        }
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
};
