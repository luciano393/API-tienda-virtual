import { Router } from 'express'
import categoryService from '../services/category.js'

const router = Router()

const {create,getAll,getById,update,_delete} = categoryService

// routes
router.post('/create', _create);
router.get('/', _getAll);
router.get('/:id', _getById);
router.put('/:id', _update);
router.delete('/:id', __delete);

export default router

function _getAll(req, res, next) {
    getAll()
        .then(categories => res.json(categories))
        .catch(err => next(err));
}

function _getById(req, res, next) {
    getById(req.params.id)
        .then(category => user ? res.json(category) : res.sendStatus(404))
        .catch(err => next(err));
}

function _create(req, res, next) {
    create(req.body)
        .then((category) => res.status(200).json({message: "Category created successfully!", data: category}))
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


