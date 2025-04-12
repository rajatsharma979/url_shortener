import mongoose from "mongoose";
const Schema = mongoose.Schema;

const url = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    orgUrl:{
        type: String,
        required: true
    },

    shortUrl:{
        type: String,
        required: true
    }, 
    
    location:[{
        place: { type: String },
        clicks:{ type: Number, default: 0 }  
    }],

    device:[{
        deviceType:{ type: String },
        clicks:{ type: Number, default: 0}
    }],

    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Url', url);