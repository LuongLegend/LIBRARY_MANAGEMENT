const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('./service/models/user');
passport.use(new JwtStrategy({//option
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY,
}, async (jwt_payload, done) => {
    try{
        //Find the user specified in token
        const  User = await user.findOne({
            where: {id: jwt_payload.sub},
            exclude: ['password','block_message','block_time','create_time','create_by']
        });
        if(!User){
            return done(null,false);
        } else {
            return done(null,User.id);
        }
    }catch(err){
        done(err,false);
    }
}))

module.exports = passport;