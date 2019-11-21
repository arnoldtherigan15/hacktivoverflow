const mongoose = require('mongoose')

let Schema = mongoose.Schema


let questionSchema = new Schema({
    title : {
        type:String,
        required: [true, 'title is required']
    },
    description : {
        type:String,
        required: [true, 'description is required']
    },
    userId : {
        type:  Schema.Types.ObjectId,
        ref:'User'
    },
    answerId :[{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    upvotes: {
        type:[Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    downvotes: {
        type:[Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    tags: [{
        type: String
    }]
},{ timestamps:true,versionKey:false })

let Question = mongoose.model('Question',questionSchema)

module.exports = Question