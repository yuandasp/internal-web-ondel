// const mongoose = require("mongoose");
// let isConnected = false;

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const connectToDB = async () => {
//   const dbUrl = process.env.MONGODB_URL;
//   mongoose.set("strictQuery", true);

//   if (!dbUrl) return console.log("MONGODB is not found");
//   if (isConnected) {
//     console.log("MongoDB connection already established");
//     return;
//   }

//   try {
//     await mongoose.connect(dbUrl, connectionParams);

//     isConnected = true;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { connectToDB };

const mongoose = require("mongoose");

let isConnected = false; // Declare the variable to track connection state

const connectToDB = async () => {
  const dbUrl = process.env.MONGODB_URL;
  mongoose.set("strictQuery", true);

  if (!dbUrl) {
    console.log("MONGODB is not found");
    return;
  }

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(dbUrl); // You can pass connection options here if needed
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error", error);
  }
};

module.exports = { connectToDB };
