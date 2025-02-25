const express=require("express");
const cors=require("cors");
const payment=require("./routes/productRoutes");
const app=express();
// Allow requests from frontend (localhost:3000)
app.use(cors({
    origin: "http://localhost:3000",  // Allow frontend requests
    methods: ["GET", "POST","PUT"]
  }));
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/api/v1",payment);

module.exports=app;



