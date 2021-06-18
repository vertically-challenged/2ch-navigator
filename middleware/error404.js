module.exports = function (req, res, next) {
    // res.status(404).render('404', {
    //     title: '404'
    // })

    // Заставим работать ссылки из post.comment таким образом
    res.redirect(`https://2ch.hk${req.url}`)
}