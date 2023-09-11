import { Schema, model } from "mongoose";

const schema = new Schema({
    first_name:{ type: String,required: true },
    last_name:{ type: String,required: true },
    email:{ type: String,required: true, unique: true},
    leads:{ type: Schema.ObjectId, ref: 'Lead'},
    roleId: {type: Schema.ObjectId, ref: 'Role'},
    hash:{type: String, required: true},
    orders: [{type:Schema.ObjectId, ref: 'Order'}],
    createDate:{type: Date, default: Date.now}
})

schema.set('toJSON', { 
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.hash
    }
}) 

export default model('User', schema);