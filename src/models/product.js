const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    model: {type : String, required: true},
    category: {type: String, required: true},
    price: {type: Schema.Types.Decimal128, required: true},
    image: {type: String, required: true },
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

module.exports = mongoose.model('Product', schema);