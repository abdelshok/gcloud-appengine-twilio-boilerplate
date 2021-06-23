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

/**
 * 
 * Express 
 * 
 */

const app = express();

/**
 * 
 * Twillio
 * 
 * Comment: An alternate way to interact with the Twilio API can be found in the Github of the Google Docs.
 * It uses the SMS / Message API and uses the function such as twilioClient.messageCreate(), etc.
 * to send messages to users.
 * 
 * The boilerplate of that type of code can be either found in the Twilio API documentation or within the Google boilerplate
 * 
 * The code below has been strippped from the aforementioned boilerplate code and will only contain Twilio code related to sending
 * emails
 * 
 * 
 **/ 

sgMail.setApiKey(PROCESS.ENV.TWILIO_API_KEY);

/**
 * 
 * Function that sends email using the Twilio SendGrid API
 * 
 * @param {Object} req Request object passed from the Express handler function 
 * @param {Object} res Response object passed from the Express handler function
 * 
 */

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
      res.status(200).send('Email successfully sent.')
      return
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Server error detected.')
    })

}

/*
 * 
 * Express Routes
 * 
 */



app.get('/email', async (req, res, next) => {
  
  await sendEmail(req, res);

  console.log('@sendEmail called.')

});

/**
 * 
 * Example code from GCP Github boilerplate to send sms using the Twilio API
 * 
 */

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



// Start the server
if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

exports.app = app;
