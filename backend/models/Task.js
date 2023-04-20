const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    game_id: {
        type: Number, 
        required: true
    },
    game_name:{
        type: String,
        required: true
    },
    total_level:{
        type: Number,
        required: true
    },
    finished_level:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);