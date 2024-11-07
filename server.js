const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(errorHandler)   // whenever we have to import middle ware we need have to use "use()"
const port =5000;

app.use('/api/contacts',require("./routes/contactRoutes"));  // here use() method acts as middleware

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})
