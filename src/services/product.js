import Models from '../helpers/db.js';
import imagekit from '../helpers/imageKit.js';

const { Product } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Product.find()
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(productParam) {
    const img = productParam.image
    await imagekit.upload({
        file: img,
        fileName: `${productParam.model}.jpeg`,
        folder: "api-folder"
    })
    .then(async response => {
        productParam.image = response.filePath
        const product = new Product(productParam);
        await product.save()
    })
    .catch(error => console.log(error))
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    if(!product) throw 'Product not found';

    Object.assign(product, productParam);
    await product.save()
}

async function _delete(id) {
    await Product.findByIdAndRemove(id)
        .then(response => console.log(response))
        .catch(error => console.log(error))
}