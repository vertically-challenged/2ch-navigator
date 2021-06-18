const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
    try {
        res.render('help-page', {
            title: 'Справка', 
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router