class IdentityController{

    identityRepository = require("../models/IdentityRepository").identityRepository;

    login(req, res) {
        this.identityRepository.login(req.body.login, req.body.password)
            .then(token => {
                res.json({
                    token: token,
                });
            })
            .catch(err => {
                res.status(403).json({ err });
            });
    }

    register(req, res) {
        this.identityRepository.register(req.body.login, req.body.email, req.body.password)
            .then(x => {
                res.json({

                });
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    }
}

let identityController = new IdentityController();
exports.identityController = identityController;