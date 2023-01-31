const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


var auth =require('./routers/auth');
var admin = require('./routers/admin');
var user = require('./routers/user');
app.use("/", auth);
app.use(admin);
app.use(user);

app.listen(3000, () => {
    console.log("listening on port 3000");
})
