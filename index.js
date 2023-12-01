import express from 'express';

const app = express();
const PORT = 3000;

app.route('/')
.post((req, res) => res.send(" a POST"))
.get((req, res) => res.send(" a GET"))
.put((req, res) => res.send(" a PUT"));


// test throwing an error to error handler 
app.route('/error').get((req,res) => {
    throw new Error("test error message");
});


/* error handler 
https://expressjs.com/en/guide/error-handling.html
use error handler must be defined at the end
*/
app.use((err, req, res, next) => {
    // Error object has three properties: name, message, and stack.
    // but 
    //res.status(500).send(err); // route /error will give empty {} object to the browser
    
    console.error(err.stack); 
    
    //res.status(500).send(err.message); // route /error will give "test error message" object to the browser
    res.status(500).send(`name: ${err.name}, message: ${err.message}, stack:${err.stack}`);
    //this gives : 
    /*
    name: Error, message: test error message, stack:Error: test error message at file:///Users/dile/labs/express-intro/index.js:14:11 at Lay...
    */

    
});
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});