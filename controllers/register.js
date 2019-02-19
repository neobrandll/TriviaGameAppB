const express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
const User = require('./../helpers/users');


router.post('/createUser', (req, res) => {
	User.checkIfUserExists(req.body.email).then((data) => {
		if (data.status === 201){
		User.registerUser(
            bcrypt.hashSync(req.body.password, 10), req.body.email)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
		}
	})
	.catch((err) => {
		res.send(err);
	})

});

module.exports = router;