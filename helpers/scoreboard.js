const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.setNewScore = (userId, gameType, score, userEmail) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.newScore, [userId, gameType, score, userEmail]).then((data) => {
                res({
                        message: "OK",
                        status: 200
                    });
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.getScoreboards = (gameType) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(sql.getScoreboard, [gameType]).then((data) => {
                res({
                    status: 200,
                    data: data
                });
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}