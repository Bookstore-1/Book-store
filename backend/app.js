const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.route");
const path=require('path');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname,'../frontend/build')))

// Route for accessing all books
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});

//app.get("/", (req, res) => {
  //res.send("Access all books /book");
//});

/* Import all routes */
app.use("/user", userRoutes); 
app.use("/book", bookRoutes); 

module.exports = app;
