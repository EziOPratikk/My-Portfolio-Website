const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/conn');
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public/');

app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('hello');
// });

app.post('/', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send(
        JSON.stringify({
          message: 'email already exists',
          statusCode: res.statusCode,
        })
      );
    }

    const contactingUser = new User({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    await contactingUser.save();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(
      JSON.stringify({
        message: 'Message sent successfully!',
        statusCode: 200,
      })
    );
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ error: error }));
  }
});

app.listen(port, () => {
  console.log('server is running at ' + port);
});
