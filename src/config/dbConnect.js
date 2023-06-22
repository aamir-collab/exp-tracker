const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // autoIndex: true,
    });
    console.log(`DB connected Successfully`);
  } catch (error) {
    console.log(`error ${error.message}`);
  }
};
module.exports = dbConnect;

// ;
