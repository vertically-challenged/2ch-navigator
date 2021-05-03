const express = require('express');
const path = require('path');
const mainPage = require('./routes/mainPage');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', mainPage);
app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});