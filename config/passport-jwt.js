const passport = require('passport');
const Admin = require('../model/adminmodel');
const jwtSta = require('passport-jwt').Strategy;
const jwtEx = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: jwtEx.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'bhavin'
}

passport.use(new jwtSta(opts, async (user, done) => {
    let admin_data = await Admin.findOne({ email: user.data.email });
    if (admin_data) {
        if (admin_data.password == user.data.password) {
            done(null, admin_data);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let data = await Admin.findById(id);
    if (data) {
        done(null, data);
    } else {
            done(null, false);
        }
})

passport.setUseraAuthenticate = (req, res, next) => {
    if (req.isAuthenticate()) {
        if (req.user.role == 'Admin') {
            req.locals.admin = req.user;
        }
    }
}

module.exports = passport;