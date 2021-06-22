// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Global Imports
const express = require('express');
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail')

const bodyParser = express.urlencoded({
  extended: false,
});

// EXPRESS

const app = express();

// TWILIO

// const {TWILIO_NUMBER} = process.env;

// if (!TWILIO_NUMBER) {
//   console.log(
//     'Please configure environment variables as described in README.md'
//   );
//   throw new Error(
//     'Please configure environment variables as described in README.md'
//   );
// }

// const twilioClient = new twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Setting the system 

// const twilioClient = new twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

sgMail.setApiKey(PROCESS.ENV.TWILIO_API_KEY);

function sendEmail (req, res) {

  const msg = {
    to: 'abdelshokair@gmail.com', // Change to your recipient
    from: '', // Change to your verified sender
    subject: '',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<div>
          <h1> </h1>
          <h2> </h2> 
          <strong></strong>
          </div>`,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      res.status(200).send('Email sent')
      return
    })
    .catch((error) => {
      console.error(error)
    })

}

// EXAMPLE CODE

app.get('/sms/send', async (req, res, next) => {
  const {to} = req.query;
  if (!to) {
    res
      .status(400)
      .send('Please provide an number in the "to" query string parameter.');
    return;
  }

  try {
    await twilioClient.messages.create({
      to: to,
      from: TWILIO_NUMBER,
      body: 'Hello from Google App Engine',
    });
    res.status(200).send('Message sent.');
  } catch (err) {
    next(err);
    return;
  }
});

// EXAMPLE CODE

app.get('/email', async (req, res, next) => {
  
  await sendEmail(req, res);

  console.log('@sendEmail called.')

});

// Start the server
if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

exports.app = app;
