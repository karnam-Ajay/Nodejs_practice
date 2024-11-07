const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use('/api/contacts',require("./routes/contactRoutes"));  // her use() method acts as middleware

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})
