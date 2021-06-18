const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser')

const error404 = require("./middleware/error404");
const searchRouter = require("./routes/search");
const helpRouter = require("./routes/help");

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});
app.engine('hbs', hbs.engine);  
app.set('view engine', 'hbs'); 
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('YEqNC69VXyPMSC38cWgW'))

app.use('/', searchRouter);
app.use('/help', helpRouter);
app.use(error404);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});