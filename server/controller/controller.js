var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in database
    user.save(user)
        .then(data => {
            //res.send(data);
            res.redirect("/add-user");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating a create operation'
            });
        });
}

//reterive and return all users / reterive and return single user.
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Not found user with id + ` + id
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error reteriving user with id ' + id
                })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error Occurred while retriving user'
                })
            })
    }
}

//update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Data to be updated can not be empty"
            })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {
            new: true
        })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Can not update the user with ${id}. Maybe user not found`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update user Information"
            })
        })
}

//delete a user with specified user id in the request.
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Can not delete with id ${id}. Maybe id is wrong`
                });
            } else {
                res.send({
                    message: 'User was successfully deleted!'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete User with id ' + id
            })
        })
}