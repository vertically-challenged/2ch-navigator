const {Router} = require('express');
const router = Router(); 

router.get('/', (req, res) => {
    console.log(req)
    res.render('index', {
        title: '2ch navigator'
    });
})

module.exports = router;