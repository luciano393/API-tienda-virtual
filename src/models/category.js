import { Schema, model} from 'mongoose';

const schema = new Schema({
    name: {type : String, required: true},
    products: [{type: Schema.ObjectId, ref:'Product'}],
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

export default model('Category', schema);