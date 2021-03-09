const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {

  const data = req.body;

  User.findOne({
    username: data.username,
  }, (error, previousUsers) => {
    // if there's an error
    if (error) {
      res.status(500).json(data);
      return next(err);
    }
    // if user already exists, check password
    // if password correct, success
    else if (previousUsers) {
      if (bcrypt.compareSync(data.password, previousUsers.password)) {
        jwt.sign({ user: previousUsers._id, username: data.username }, process.env.SECRET_KEY, {
          expiresIn: 1200
        },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      }
      else {
        return res.status(204).json({
          msg: "Password is incorrect"
        });
      }
    }
    // if can't find user, error
    else {
      return res.status(204).json(data);
    }
  })
});

router.post('/register', (req, res) => {
  console.log("body: ", req.body);

  // content to send to database
  const data = req.body;

  User.findOne({
    username: data.username
  }, (error, previousUsers) => {
    if (error) {
      res.status(500).json(data);
      return next(err);
    }

    // if username exists, send error message
    else if (previousUsers) {
      return res.status(204).json(data);
    }

    // if username doesn't exist, add them to database
    else {
      const newUser = new User(data);

      newUser.username = data.username;
      newUser.password = newUser.generateHash(data.password);

      newUser.save(() => {

        jwt.sign({ user: newUser.id, username: data.username }, process.env.SECRET_KEY, {
          expiresIn: 1200
        },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          });
      })

    }
  })


});


module.exports = router;