import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const schema = new Schema({
    name:{ type: String,required: true },
    description:{type: String, required: true},
    state:{type:Boolean, required: true},
    createDate:{type: Date, default: Date.now}
})

export default model('Role', schema);