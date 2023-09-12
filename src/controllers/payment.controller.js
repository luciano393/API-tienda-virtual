import { Router } from 'express'
import paymentService from '../services/payment.js'

const router = Router()

const {create,getAll,getById,update,_delete} = paymentService

// routes
router.post('/create', _create);
router.get('/', _getAll);
router.get('/:id', _getById);
router.put('/:id', _update);
router.delete('/:id', __delete);

export default router

function _getAll(req, res, next) {
    getAll()
        .then(payments => res.json(payments))
        .catch(err => next(err));
}

function _getById(req, res, next) {
    getById(req.params.id)
        .then(payment => user ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}

function _create(req, res, next) {
    create(req.body)
        .then((payment) => res.status(200).json({message: "Payment created successfully!", data: payment}))
        .catch(err => next(err)); 
}

function _update(req, res, next) {
    update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function __delete(req, res, next) {
    _delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

