const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/contactingUser')
  .then(() => {
    console.log('mongodb connection successful');
  })
  .catch((error) => {
    console.log(error);
  });
