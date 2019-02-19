const db = require('./db');
const bcrypt = require('bcryptjs');
const sql = require('./queries.js');

module.exports.getUserByUsername = (usernameOrEmail) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(sql.getUser, [usernameOrEmail]).then((data) => {
                res(data);
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

module.exports.checkIfUserExists = ( email) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.getUser, [email]).then((data) => {
                res({status: 201});
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej({
                    status:401,
                    error: error});
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.registerUser = ( password, email) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(sql.newUser, [ password, email])
                .then(() => {
                    res({
                        message: "OK",
                        status: 200
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'not Created',
                        status: 500
                    });
                    obj.done();
                });
        });
    });
};