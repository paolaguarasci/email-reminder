/* eslint no-console: 0 */
'use strict';

const nodemailer = require('nodemailer');

// // Generate SMTP service account from ethereal.email
// nodemailer.createTestAccount((err, account) => {
//     if (err) {
//         console.error('Failed to create a testing account');
//         console.error(err);
//         return process.exit(1);
//     }

//     console.log('Credentials obtained, sending message...');
//     console.log(account);
//     // NB! Store the account object values somewhere if you want
//     // to re-use the same account for future mail deliveries

//     // Create a SMTP transporter object
//     let transporter = nodemailer.createTransport(
//         {
//             host: account.smtp.host,
//             port: account.smtp.port,
//             secure: account.smtp.secure,
//             auth: {
//                 user: account.user,
//                 pass: account.pass
//             },
//             logger: false,
//             debug: false // include SMTP traffic in the logs
//         },
//         {
//             // default message fields

//             // sender info
//             from: 'Pangalink <no-reply@pangalink.net>',
//             headers: {
//                 'X-Laziness-level': 1000 // just an example header, no need to use this
//             }
//         }
//     );

//     // Message object
//     let message = {
//         // Comma separated list of recipients
//         to: 'Paola Guarasci <paolaguarasci@gmail.com>',

//         // Subject of the message
//         subject: 'Nodemailer is unicode friendly ✔',

//         // plaintext body
//         text: 'Hello to myself!',

//         // HTML body
//         html:
//             '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
//             '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

//         // An array of attachments
//         // attachments: [
//         //     // String attachment
//         //     {
//         //         filename: 'notes.txt',
//         //         content: 'Some notes about this e-mail',
//         //         contentType: 'text/plain' // optional, would be detected from the filename
//         //     },

//         //     // Binary Buffer attachment
//         //     {
//         //         filename: 'image.png',
//         //         content: Buffer.from(
//         //             'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
//         //             '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
//         //             'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
//         //             'base64'
//         //         ),

//         //         cid: 'note@example.com' // should be as unique as possible
//         //     },

//         //     // File Stream attachment
//         //     {
//         //         filename: 'nyan cat ✔.gif',
//         //         path: __dirname + '/assets/nyan.gif',
//         //         cid: 'nyan@example.com' // should be as unique as possible
//         //     }
//         // ]
//     };

//     transporter.sendMail(message, (error, info) => {
//         if (error) {
//             console.log('Error occurred');
//             console.log(error.message);
//             return process.exit(1);
//         }

//         console.log('Message sent successfully!');
//         console.log(nodemailer.getTestMessageUrl(info));

//         // only needed when using pooled connections
//         transporter.close();
//     });
// });

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'oaaxqiyu6ihjk7dz@ethereal.email',
        pass: '4Jkkwr2GpPqhVVSw5q'
    }
});
//Read data from an Excel spreadsheet.
const xlsx = require('node-xlsx');
const fs = require('fs');
var data = xlsx.parse(__dirname + '/data/duesRecords.xlsx'); // parses a file
var data = xlsx.parse(fs.readFileSync(__dirname + '/data/duesRecords.xlsx'));
// console.log(data[0].data)
let list = clientWithDebts(data[0].data);
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

console.log(list);

// Find their email addresses and send them personalized reminders
// let message = {
//     // Comma separated list of recipients
//     to: recipient,

//     // Subject of the message
//     subject: subject,

//     // plaintext body
//     text: mailTxt
// }
// transporter.sendMail(message, (error, info) => {
//     if (error) {
//         console.log('Error occurred');
//         console.log(error.message);
//         return process.exit(1);
//     }
//     console.log('Message sent successfully!');
//     console.log(nodemailer.getTestMessageUrl(info));
//     // only needed when using pooled connections
//     transporter.close();
// });

// Find their phone number and send them personalized reminders