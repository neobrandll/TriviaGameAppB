const express = require('express');
let router = express.Router();
const Scoreboard = require('../helpers/scoreboard');
const auth = require('./../middlewares/jwtAuth');


router.post('/setScore', auth, (req, res) => {
    Scoreboard.setNewScore(
            req.user.users_id,
            req.body.gameType,
            req.body.matchScore, 
            req.user.users_email)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
});


router.get('/getScores', auth, (req, res) => {
    console.log("hola: "+ req.user.users_email)
    Scoreboard.getScoreboards(req.query.gametype)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;