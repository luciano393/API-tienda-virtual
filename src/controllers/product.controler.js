import { Router } from 'express';
const router = Router();
import productServices from '../services/product.js';

const { create,getAll,getById, update,_delete } = productServices

router.post('/create', _create);
router.get('/', _getAll);
router.get('/:id', _getById);
router.put('/:id', _update);
router.delete('/:id', __delete);

export default router;

function _create(req, res, next) {
    create(req.body)
        .then((product) => res.status(200).json({message: "Product created successfully!", data: product}))
        .catch(e => next(e))
}

function _getAll(req,res,next) {
    getAll()
        .then(products => res.json(products))
        .catch(e => next(e))
}

function _getById(req, res, next) {
    getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(e => next(e))
}

function _update(req, res, next) {
    update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function __delete(req, res, next) {
    _delete(req.params.id)
        .then((res) => res.json({}))
        .catch(err => next(err));
}




