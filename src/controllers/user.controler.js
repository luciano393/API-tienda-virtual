import { Router } from 'express';
const router = Router();
import userServices from '../services/user.js';

const { _authenticate, create, _getAll, _getById, _update, _delete } = userServices

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleted);

export default router;

function authenticate(req, res, next) {
    _authenticate(req.body)
        .then(user => user ? res.status(200).json({message: "Login Successful.", data: user}) : res.status(401).json({message: 'Email or password is incorrect'}))
        .catch(err => next(err));
}

function register(req, res, next) {
    create(req.body)
        .then((user) => res.status(200).json({message: "User created successfully!", data: user}))
        .catch(err => next(err)); 
}

function getAll(req, res, next) {
    _getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    _getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    _getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    _update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleted(req, res, next) {
    __delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
