import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on("error", err => {
  console.log("error", err)
})

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose Connected");
})