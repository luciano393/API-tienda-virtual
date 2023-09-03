import { Schema as _Schema, model as _model } from 'mongoose';
const Schema = _Schema;

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

export default _model('Product', schema);