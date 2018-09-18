/* eslint no-console: 0 */
'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const xlsx = require('node-xlsx');
const fs = require('fs');

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.FAKESMTP_USER,
        pass: process.env.FAKESMTP_PSW
    }
});

//Read data from an Excel spreadsheet.
// const data = xlsx.parse(__dirname + '/data/duesRecords.xlsx'); // parses a file
const data = xlsx.parse(fs.readFileSync(__dirname + '/data/duesRecords.xlsx'));
const list = clientWithDebts(data[0].data);

// Find all member who have not paid dues for the latest month.
function clientWithDebts(data) {
    let result = []
    let month = data[0].slice(3).length;
    console.log(month);
    let clients = data.slice(1);
    for (let i in clients) {
        if (clients[i].slice(3).length != month) {
            result.push({
                name: clients[i][0],
                phone: clients[i][1],
                email: clients[i][2],
                month: month - clients[i].length + 3,
            });
        }
    }
    return result;
}

// Find their email addresses and send them personalized reminders
function sendEmailReminder(list) {
    for (let i in list) {
        let message = {
            // Comma separated list of recipients
            to: list[i].email,

            // Subject of the message
            subject: "Reminder for " + list[i].name,

            // plaintext body
            text: "Ciao " + list[i].name + ", non risultano pagati tutti i mesi di abbonamento. Da saldare: " + list[i].month + " mensilità. Spero tu voglia risovere presto!!!"
        }
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }
            console.log('Message sent successfully!');
            console.log(nodemailer.getTestMessageUrl(info));
            // only needed when using pooled connections
            transporter.close();
        });
    }
}
sendEmailReminder(list);


// // Find their phone number and send them personalized reminders
// // Download the helper library from https://www.twilio.com/docs/node/install
// // Your Account Sid and Auth Token from twilio.com/console
// const accountSid = process.env.TWILLIO_SID;
// const authToken = process.env.TWILLIO_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//         from: '+393475131691',
//         to: '+393475131691'
//     })
//     .then(message => console.log(message.sid))
//     .done();