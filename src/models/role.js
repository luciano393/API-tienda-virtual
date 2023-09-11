import { Schema, model } from "mongoose";

const schema = new Schema({
    name:{ type: String,required: true },
    description:{type: String, required: true},
    state:{type:Boolean, required: true},
    users:[{type:Schema.ObjectId, ref: 'User'}],
    createDate:{type: Date, default: Date.now}
})

export default model('Role', schema);