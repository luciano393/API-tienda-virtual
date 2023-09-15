import { Schema, model} from 'mongoose';

const schema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'User'},
    ip_address: {type: String},
    currency_id: {type: String},
    date_approved: {type: Date},
    order: {type: Object},
    payment_type_id: {type: String},
    items: [{type: Object, required: true}],
    payer: {type: Object},
    status_detail: {type: String},
    shipments: {type: Object},
    transaction_details: {type: Object},
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
}) 

export default model('Payment', schema);