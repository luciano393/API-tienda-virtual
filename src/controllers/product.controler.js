import { Router } from 'express';
const router = Router();
import productControler from '../services/product.js';

const { _create,_getAll,_getById, _update,__delete } = productControler

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

export default router;

function create(req, res, next) {
    _create(req.body)
        .then((product) => res.status(200).json({message: "Product created successfully!", data: product}))
        .catch(e => next(e))
}

function getAll(req,res,next) {
    _getAll()
        .then(products => res.json(products))
        .catch(e => next(e))
}

function getById(req, res, next) {
    _getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(e => next(e))
}

function update(req, res, next) {
    _update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    __delete(req.params.id)
        .then((res) => res.json({}))
        .catch(err => next(err));
}




