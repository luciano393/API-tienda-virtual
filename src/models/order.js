import { Schema, model} from 'mongoose';

const schema = new Schema({
    userId: {type : Schema.ObjectId, ref:'User', require: true},
    products: [{type: Schema.ObjectId, ref:'Product'}],
    amount: {type:Schema.Types.Decimal128},
    orderAddress: {type:String, require: true},
    status: {type: Boolean, require: true},
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