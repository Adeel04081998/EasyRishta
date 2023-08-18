
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
var serviceAccount = require('./easy-rishta-ac1e8-firebase-adminsdk-15dc8-f4f0d34ba6.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.post('/send-notification', (req, res) => {

 

 const { recipientDetail,senderDeatil, token, } = req.body;
console.log("senderDeatil",JSON.stringify(senderDeatil?.userFirstName));
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
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Notification sent:', response);
      res.status(200).json({ message: 'Notification sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    });

    
});
app.listen(3000, () => {
  console.log("server Running");
})

