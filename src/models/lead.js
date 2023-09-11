import { Schema, model } from "mongoose";

const schema = new Schema({
    userId: {type:Schema.ObjectId, ref:'User'},
    country:{ type: String},
    zip_code:{ type: String},
    state:{ type: String},
    city:{ type: String},
    street_name: {type: String,},
    street_number: {type: Number},
    phone:{
        area_code: {type:Number},
        number: {type:Number}
    },
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