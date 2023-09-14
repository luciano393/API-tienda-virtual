import { Schema, model} from 'mongoose';

const schema = new Schema({
    user_id: {type: Schema.ObjectId, required: true},
    items: [{type: Object, required: true}],
    payer: {type: Object},
    shipments: {type: Object},
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

export default model('Order', schema);