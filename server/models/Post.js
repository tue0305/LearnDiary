const mongoose = require('mongoose');
const Schema = mongoose.Schema

const STATUS =  ['TO LEARN', 'LEARNING', 'LEARNED']

const PostSchema = new Schema({
    title: {
        type: 'string',
        required: true,
        
    },

    description: {
        type: 'string',
    },

    url: {
        type: 'string',
    },
    
    status: {
        type: 'string',
        enum: STATUS,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = mongoose.model('posts', PostSchema)