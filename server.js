const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set Handlebar routes
app.get('/', function (req,res){
    res.render('home', {
        stuff: "This is stuff"
    });
});
app.get('/about', function (req,res){
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});