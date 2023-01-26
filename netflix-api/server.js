const express=require('express');
const cors=require('cors');

const mongoose = require('mongoose');
const userRoutes=require('./routes/UserRoutes');

mongoose.set('strictQuery', true);
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/netflix",{

    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Mongo db connected successfully")
});

app.use("/api/user",userRoutes)

app.listen(5000,console.log("server Started !"));