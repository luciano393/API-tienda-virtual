import { Router } from 'express';
const router = Router();
import userServices from '../services/user.js';

const { authenticate, create, getAll, getById, update, _delete } = userServices

// routes
router.post('/authenticate', _authenticate);
router.post('/register', register);
router.get('/', _getAll);
router.get('/current', getCurrent);
router.get('/:id', _getById);
router.put('/:id', _update);
router.delete('/:id', __delete);

export default router;

function _authenticate(req, res, next) {
    authenticate(req.body)
        .then(user => user ? res.status(200).json({message: "Login Successful.", data: user}) : res.status(401).json({message: 'Email or password is incorrect'}))
        .catch(err => next(err));
}

function register(req, res, next) {
    create(req.body)
        .then((user) => res.status(200).json({message: "User created successfully!", data: user}))
        .catch(err => next(err)); 
}

function _getAll(req, res, next) {
    getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _getById(req, res, next) {
    getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _update(req, res, next) {
    update(req.params.id, req.body)
        .then(() => res.json({message: "Usuario actualizado"}))
        .catch(err => next(err));
}

function __delete(req, res, next) {
    _delete(req.params.id)
        .then(() => res.json({message: "Usuario eliminado"}))
        .catch(err => next(err));
}
