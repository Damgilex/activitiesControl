const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
        default: false,
    },
    active:{
        type:Boolean,
        default: true,
    }
});

module.exports = mongoose.model('tasks',TaskSchema);
