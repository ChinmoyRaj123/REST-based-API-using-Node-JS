const express = require('express')
const router = express.Router();
const { Projects } = require('../models/projects')

//getting all projects
router.get('/', async (req, res) => {
    try{
        const projects = await Projects.find()
        res.json(projects)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
});

//getting one project
router.get('/:id', getprojects, (req, res) => {
    res.send(res.projects_id)
});

//creating one project
router.post('/', async (req, res) => {
    const projects1 = new Projects({
        name: req.body.name,
        description: req.body.description,
        items_used: req.body.items_used
    })

    try{
        const newprojects = await projects1.save()
        res.status(201).json(newprojects)
    } catch(err){
        res.status(400).json({message: err.message})
    }
});

//updating one project
router.patch('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const updates = req.body

        const result = await Projects.findByIdAndUpdate(id,updates)
        res.json(result)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
});


//deleting one
router.delete('/:id', getprojects, async (req, res) => {
    try{
        await res.projects_id.remove()
        res.json({ message: 'Deleted Project'})
    } catch(err){
        res.status(500).json({ message: err.message })
    }
});

//creating middleware to use in other routers
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