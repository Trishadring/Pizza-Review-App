const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function (accessToken, refreshToken, profile, cb) {
    // <- verify callback function, this function is called
    // whenever the user has been logged in using the oAuth
    // Search you database and see if the user exists
    // User.findOne({'googleId': profile.id})
    User.findOne({ googleId: profile.id }, function (err, userDoc) {
      if (err) return cb(err); // if there is an error use the callback to proceed to the next line in middleware

      if (userDoc) {
        // if the user exists

        return cb(null, userDoc); // send the user doc to the next a middleware function in passport
        // cb is verify callback that will pass  our information to passport.serializeUser at the bottom of the file
        // cb(error, SuccessWhichIsYourUserDocument)
      } else {
        // Create the user in the db
        const newUser = new User({
          username: profile.displayName,
          userId: profile.id,
        });

        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser); // success, pass that user doc to the next place in the middleware chain,p
        });

      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, userDoc) { // search our databases for the user, with the id from the session
    done(err, userDoc); // when we call done here pass in the studentDoc,  This is where req.user = studentDoc
  });
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be available in every Single controller function, so you always know the logged in user

});



