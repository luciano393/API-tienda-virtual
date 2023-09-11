import { Schema, model} from 'mongoose';

const schema = new Schema({
    order_id: {type: Schema.ObjectId, ref: 'Order'},
    data_created: {type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

export default model('Payment', schema);