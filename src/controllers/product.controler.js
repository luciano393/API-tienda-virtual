const express = require('express');
const router = express.Router();
const productServer = require('../services/product');

router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    productServer.create(req.body)
        .then((product) => res.status(200).json({message: "Product created successfully!", data: product}))
        .catch(e => next(e))
}

function getAll(req,res,next) {
    productServer.getAll()
        .then(products => res.json(products))
        .catch(e => next(e))
}

function getById(req, res, next) {
    productServer.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(e => next(e))
}

function update(req, res, next) {
    productServer.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productServer._delete(req.params.id)
        .then((res) => res.json({}))
        .catch(err => next(err));
}




