import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const schema = new Schema({
    name:{ type: String,required: true },
    email:{ type: String,required: true, unique: true},
    phone:{ type: Number },
    roleId: {type: Schema.ObjectId, required: true},
    hash:{type: String, required: true},
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