var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.route('/')
    //GET all users
    .get(function(req, res, next) {
        //retrieve all user from Monogo
        mongoose.model('user').find({}, function (err, users) {
              if (err) {
                  return console.error(err);
              } else {
                  res.send(users);
              }     
        });
    });

module.exports = router;