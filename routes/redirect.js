const express = require('express')

const router = express.Router()

const Url = require('../models/urlModel')

router.get('/', async (req, res) => {
    
    res.send('index',)
    })
router.get('/:code', async (req, res) => {
        const url = await Url.findOne({
            
            urlCode: req.params.code,
            
        })
            
        if (url == null) return res.sendStatus(404)

        url.clicks++
        Url.save()

        res.redirect(url.full)
        }


    
    // catch (err) {
    //     console.error(err)
    //     res.status(500).json('Server Error')
    // }
)


module.exports = router