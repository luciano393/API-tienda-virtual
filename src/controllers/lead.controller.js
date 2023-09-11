import { Router } from 'express'
import leadService from '../services/lead.js'

const router = Router()

const {create,getAll,getById,update,_delete} = leadService

// routes
router.post('/create', _create);
router.get('/', _getAll);
router.get('/:id', _getById);
router.put('/:id', _update);
router.delete('/:id', __delete);

export default router

function _getAll(req, res, next) {
    getAll()
        .then(leads => res.json(leads))
        .catch(err => next(err));
}

function _getById(req, res, next) {
    getById(req.params.id)
        .then(lead => user ? res.json(lead) : res.sendStatus(404))
        .catch(err => next(err));
}

function _create(req, res, next) {
    create(req.body)
        .then((lead) => res.status(200).json({message: "Lead created successfully!", data: lead}))
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

