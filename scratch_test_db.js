const mongoose = require('mongoose');
const uri = "mongodb+srv://alishabatham2_db_user:alishabatham2004@cluster0.8fwstk6.mongodb.net/onewinq?appName=Cluster0";

console.log("Attempting database connection...");
mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas Cluster successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("ERROR: Connection failed:", err);
    process.exit(1);
  });
