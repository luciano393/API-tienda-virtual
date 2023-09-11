import { Schema, model } from "mongoose";

const schema = new Schema({
    userId: {type:Schema.ObjectId, ref:'User'},
    country:{ type: String,required: true },
    state:{ type: String,required: true},
    address: {type: String, required: true},
    phoneNumber:{type: Number, required: true},
})

schema.set('toJSON', { 
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.hash
    }
}) 

export default model('Lead', schema);