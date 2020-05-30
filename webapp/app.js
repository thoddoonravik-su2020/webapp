const express = require ('express');
const ex
const app = express();
//for route
app.use('/', require('./routes/route'));
app.use('/user', require('./routes/user'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));