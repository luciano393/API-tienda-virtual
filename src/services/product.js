import Models from '../helpers/db.js';
import imagekit from '../helpers/imageKit.js';

const { Product, Category } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Product.find().populate('categoryId')
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
        const category = await Category.findById(productParam.categoryId)
        const product = new Product(productParam);
        const savedProduct = await product.save()
        category.products = category.products.concat(savedProduct._id)
        await category.save()
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