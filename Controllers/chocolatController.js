const express = require('express')
const router = express.Router()
const Chocolat = require('../Models/Chocolates')



// ********************************** Create Route ***********************************************


router.post('/', async(req,res) => {
    try{
        console.log(req.body, "this is req.body");
        req.body.user = req.session.userId;
        const createdChocolat = await Chocolat.create(req.body);
        //  console.log('response happening?')
         res.json({
             status: {
                 code: 201,
                 message: "Resource successfully created"
             },
             data: createdChocolat
         })
    } catch(err){
        console.log(err);
        res.send(err)
    }
})

// ********************************** Read Route ***********************************************


//(get route)----will show whatever chocolate we're looking for

router.get('/:id', async (req, res, next) => {
    try {
        const foundChocolat = await Chocolat.findById(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: foundChocolat
        })
    } catch (err){
        res.send(err)
    }
})
// ********************************** Update Route ***********************************************


router.put('/:id', async (req, res) => {
    try{
        const updatedChocolat = await Chocolat.findByIdAndUpdate( req.params.id, req.body, {new:true});
        res.json({
            status: {
                code: 201,
                message: "Resource successfully updated"
            },
            data: updatedChocolat 
        });
    } catch(err){
        res.send(err)
    }
 })


 // ********************************** Delete Route ***********************************************


//delete route, will delete a specific chocolate
router.delete('/:id', async (req, res) => {
    try{
        const deletedChocolat = await Chocolat.findByIdAndRemove(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Resource successfully deleted"
            },
            data: deletedChocolat
        })
    } catch(err){
        res.send(err)
    }
});

module.exports = router;