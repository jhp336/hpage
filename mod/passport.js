var db = require('./db.js');
var bcrypt = require('bcrypt');
 
module.exports = function (app) {
    var passport = require('passport')
        , LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('ser', user);
        done(null, user.key);
    });

    passport.deserializeUser(function (keyval, done) {
        console.log('deser', keyval);
        var user = db.get('users').find({
            key: keyval
        }).value();
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw'
    },
        function (username, password, done) {
            var user = db.get('users').find({
                id: username
            }).value();
            if (!user) {
                return done(null, false, { message: '아이디 입력 오류' });
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (!result)
                return done(null, false, { message: '비밀번호 입력 오류' });

                else return done(null, user);
            });
        }
    ));
    return passport;
}