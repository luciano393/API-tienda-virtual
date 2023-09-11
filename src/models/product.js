import { Schema, model} from 'mongoose';

const schema = new Schema({
    title: {type : String, required: true},
    description: {type : String, required: true},
    category_id:{type: Schema.ObjectId, ref: 'Category'},
    unit_price: {type: Schema.Types.Decimal128, required: true},
    picture_url: {type: String, required: true },
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