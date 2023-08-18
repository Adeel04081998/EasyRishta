
const admin = require('firebase-admin')
const functions = require('firebase-functions');
const serverless = require("serverless-http");
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const router = express.Router();
var serviceAccount = require('../easy-rishta-ac1e8-firebase-adminsdk-15dc8-f4f0d34ba6.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

router.post('/send-notification', (req, res) => {
 const { recipientDetail,senderDeatil, token, } = req.body;
console.log("senderDeatil",req.body);
  let message = {
    notification: {
      title: "Easy Rishta",
      // body: "Interest send by"+titleMsg
      body:`Interest send by ${JSON.stringify(senderDeatil?.userFirstName)}`
    },
    data: {
      senderDetail: JSON.stringify(senderDeatil),
      recipientDetail: JSON.stringify(recipientDetail),
    },
    token:token
}
console.log("message",message);
// res.status(200).json({ message: 'Notification sent successfully' });
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Notification sent:', response);
      res.status(200).json({ message: 'Notification sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification',error });
    });

    
});




router.get('/demo', (req, res) => {
        res.json([
          {
            id: '001',
            name: 'Smith',
            email: 'smith@gmail.com',
          },
          {
            id: '002',
            name: 'Sam',
            email: 'sam@gmail.com',
          },
          {
            id: '003',
            name: 'lily',
            email: 'lily@gmail.com',
          },
        ]);
      });
      router.get("/", (req, res) => {
          res.json({
            hello: "hi! Welcome to api new"
          });
        });
app.use(`/.netlify/functions/api`, router);

// app.listen(3000, () => {
//   console.log("server Running");
// })
module.exports = app;
module.exports.handler = serverless(app);






// const express = require("express");
// const serverless = require("serverless-http");

// // Create an instance of the Express app
// const app = express();

// // Create a router to handle routes
// const router = express.Router();
// router.get('/demo', (req, res) => {
//     res.json([
//       {
//         id: '001',
//         name: 'Smith',
//         email: 'smith@gmail.com',
//       },
//       {
//         id: '002',
//         name: 'Sam',
//         email: 'sam@gmail.com',
//       },
//       {
//         id: '003',
//         name: 'lily',
//         email: 'lily@gmail.com',
//       },
//     ]);
//   });

// // Define a route that responds with a JSON object when a GET request is made to the root path
// router.get("/", (req, res) => {
//   res.json({
//     hello: "hi! how are you bro"
//   });
// });

// // Use the router to handle requests to the `/.netlify/functions/api` path
// app.use(`/.netlify/functions/api`, router);

// // Export the app and the serverless function
// module.exports = app;
// module.exports.handler = serverless(app);