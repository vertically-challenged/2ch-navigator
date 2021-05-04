const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});