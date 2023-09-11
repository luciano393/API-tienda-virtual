import { Schema, model} from 'mongoose';

const schema = new Schema({
    model: {type : String, required: true},
    categoryId: {type: Schema.ObjectId, ref: 'Category'},
    price: {type: Schema.Types.Decimal128, required: true},
    image: {type: String, required: true },
    stock: {type: Number, required: true},
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

export default model('Product', schema);