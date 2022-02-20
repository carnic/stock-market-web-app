const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded());

async function getStockDetails (symbol, cb) {
    request(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`,
        {json:true}, 
        (err, res, body) => {
            if (err) cb('Error in retrieval'); // error
            if (res.statusCode === 200){ // success
                cb(body);
            }
        }
    );
}
// Set Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set Handlebar routes
app.get('/', function async (req,res){
    getStockDetails('aapl',function(data){
            res.render('home', {
            stock: data,
        });
    });
});
app.post('/', function async (req,res){
    getStockDetails(req.body.stock_ticker, function(data){
            res.render('home', {
            stock: data,
        });
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