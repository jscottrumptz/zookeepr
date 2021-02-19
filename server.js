const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));

// parse incoming json data
app.use(express.json());

// make the public folder files static resources
app.use(express.static('public'));

// This is our way of telling the server that any time a client navigates to <ourhost>/api, 
// the app will use the router we set up in apiRoutes. If / is the endpoint, then the router 
// will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});