import Models from '../helpers/db.js'

const { Category } = Models

export default {
    getAll,
    getById,
    create,
    update,
    _delete
}

async function getAll() {
    return await Category.find().populate('products')
}

async function getById(id) {
    return await Category.findById(id)
}

async function create(categoryParam) {
    const data = await Category.findOne({ name: categoryParam.name })
    if(data) {
        return console.log('Category "' + categoryParam.name + '" is already taken')
    } else {
        const category = new Category(categoryParam)
        await category.save()
        return category
    }
}

async function update(id, categoryParam) {
    const category = await Category.findById(id);

    if(!category) throw 'Category not found'

    Object.assign(category, categoryParam)
    await category.save()
}

async function _delete(id) {
    await Category.findByIdAndRemove(id)
        .then(res => console.log(res))
        .catch(error => console.log(error))
}

