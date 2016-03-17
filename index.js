var twilio = require('twilio')
var express = require('express')
var app = express()

var sid = "AC7d19ea7635feb869b7e9d604dbe0b387"
var secret = process.env.TWILIO
var client = twilio(sid, secret)
app.post('/warning', function(req, res) {
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

console.log("Listening")
app.listen(1337)

