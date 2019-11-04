const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');

// connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// delete data
const deletetData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deletetData();
}
