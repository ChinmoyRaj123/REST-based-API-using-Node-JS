const express = require('express')
const router = express.Router();
const { Items } = require('../models/projects')


//getting all items
router.get('/', async (req, res) => {
    try{
        const items = await Items.find()
        res.json(items)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
});

//getting one item
router.get('/:id', getitems, (req, res) => {
    res.send(res.items_id)
});

//creating one item
router.post('/', async (req, res) => {
    const items1 = new Items({
        name: req.body.name,
        price: req.body.price,
        used_in_project: req.body.used_in_project
    })

    try{
        const newitems = await items1.save()
        res.status(201).json(newitems)
    } catch(err){
        res.status(400).json({message: err.message})
    }
});

//updating one item
router.patch('/:id', getitems,async (req, res) => {
    if (req.body.name != null){
        res.items_id.name = req.body.name
    }
    if (req.body.description != null){
        res.items_id.price = req.body.price
    }
    if (req.body.items_used != null){
        res.items_id.used_in_project = req.body.used_in_project
    }
    try{
        const updatedItems = await res.items_id.save()
        res.json(updatedItems)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
});

//deleting one item
router.delete('/:id', getitems, async (req, res) => {
    try{
        await res.items_id.remove()
        res.json({ message: 'Deleted Project'})
    } catch(err){
        res.status(500).json({ message: err.message })
    }
});

//creating middleware to use in other routers
async function getitems(req,res,next){
    let items_id
    try{
        items_id = await Items.findById(req.params.id)
        if (items_id == null){
            return res.status(404).json({message: 'Cannot find project'})
        }
    } catch (err){
        res
        .status(500).json({message: err.message})
    }

    res.items_id = items_id
    next()
}
module.exports = router