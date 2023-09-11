import { Schema, model} from 'mongoose';

const schema = new Schema({
    payer: {type : Schema.ObjectId, ref:'User', required: true},
    items: [{type: Schema.ObjectId, ref:'Product', required: true}],
    amount: {type:Schema.Types.Decimal128, required: true},
    receiver_address: {
        zip_code: {type: String, required: true},
        state_name: {type: String, required: true},
        city_name: {type: String, required: true},
        street_name: {type: String, required: true},
        street_number: {type: Number, required: true},
        floor: {type: String},
        apartament: {type: String}
    },
    status: {type: Boolean, required: true},
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