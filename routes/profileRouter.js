const express = require('express');
const bodyParser = require('body-parser');
const Profile = require('../models/profile');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());


profileRouter.route('/')
    .get((req, res, next) => {
        Profile.find()
            .then(profile => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Profile.create(req.body)
            .then(profile => {
                console.log('Profile Created', profile);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /profile');
    })
    .delete((req, res, next) => {
        Campsite.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
    });

profileRouter.route('/:profileId')
    .get((req, res, next) => {
        Profile.findById(req.params.profileId)
        .then(profile => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profile);
        })
        .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /profile/${req.params.profileId}`);
    })
    .put((req, res, next) => {
        Profile.findByIdAndUpdate(req.params.profileId, {
            $set: req.body
        }, { new: true})
        .then(profile => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(profile);
        })
        .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Profile.findByIdAndUpdate(req.params.profileId)
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err))
    })

module.exports = profileRouter;    
