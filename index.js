var twilio = require('twilio')
var express = require('express')
var app = express()
var fs = require('fs')

var sid = "AC7d19ea7635feb869b7e9d604dbe0b387"
var secret = "9d92647c98001316d5dd653c34bb618e"
var client = twilio(sid, secret)
app.use(express.static('public'))
app.post('/warning-text', function(req, res) {
  console.log("warning")
  client.sendMessage({

    to:'+12265053154', // Any number Twilio can deliver to
    from: '+17059900308', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio
      console.log(responseData)
      console.log(err)
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }

  });
})

app.post('/warning-call', function(req, res) {
  console.log("warning")
   client.makeCall({

      to:'+12265053154', // Any number Twilio can deliver to
      from: '+17059900308', // A number you bought from Twilio and can use for outbound communication
      url: 'http://45.55.170.173:1337/recording.wav' // A URL that produces an XML document (TwiML) which contains instructions for the call

  }, function(err, responseData) {

      //executed when the call has been initiated.
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      console.log(responseData.from); // outputs "+14506667788"
      res.status(200).end

  });
})

app.post('/twilio.xml', function(req, res) {
  console.log("Posting to XML")
  fs.readFile('./public/twilio.xml', function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.status(200);
    res.type('application/xml')
    res.end(data);
  });
})

app.post('/recording.wav', function(req, res) {
  console.log("Posting to wav")
  fs.readFile('./public/recording.wav', function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.status(200);
    res.type('audio/x-wav')
    res.end(data);
  });
})

console.log("Listening")
app.listen(1337)

