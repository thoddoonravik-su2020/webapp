const express = require ('express');
const app = express();
//for route
app.use('/', require('./routes/route'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));