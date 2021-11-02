const express = require('express')
const router = express.Router();
const {Projects, Items} = require('../models/projects')

//getting all items used in one project
router.get('/:id', getprojects, (req, res) => {
    res.send(res.projects_id.items_used)
});

async function getprojects(req,res,next){
    let projects_id
    try{
        projects_id = await Projects.findById(req.params.id)
        if (projects_id == null){
            return res.status(404).json({message: 'Cannot find project'})
        }
    } catch (err){
        res
        .status(500).json({message: err.message})
    }

    res.projects_id = projects_id
    next()
}

module.exports = router