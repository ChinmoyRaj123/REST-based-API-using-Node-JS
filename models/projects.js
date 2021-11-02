const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    used_in_project:{
        type: String,
        required: true
    }
});

const projectsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    items_used: [itemsSchema]
});

const Projects = mongoose.model('Projects', projectsSchema)
const Items = mongoose.model('Items', itemsSchema)
module.exports = {Projects, Items};