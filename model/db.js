const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log(`[MongoDB] Connected to database Successfully.`))
  .catch(err => console.log(`[MongoError] Failed to connect to database.`));
