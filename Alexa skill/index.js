const request = require('request')
const crypto = require("crypto");


var https = require('https')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to Interac E-Tranfer, request money from a contact with his or her phone number", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "RequestMoney":
            
            contact_name = event.request.intent.slots.contact.value;
            amount = event.request.intent.slots.amount.value;
            contact_handle = event.request.intent.slots.phone_num.value;
            type = "sms";
            //requestMoneyFromOneTimeContact("Mark", 55, "clockfifty@gmail.com", "email");
            request.get(access_token_args, function (err, res, body) {
console.log(`2`)
    if(err){
      console.log(err);
    }else{

    data = JSON.parse(body);
    let access_token = data.access_token;

      let args = {
        url: "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
          "accessToken" : "Bearer " + access_token,
          "salt" : "TestingSalt",
          "requestId" : "1235967",
          "deviceId" : "lol798",
          "apiRegistrationId" : "CA1ARrWNRT44Kuep"
        },
        body: JSON.stringify({
        "sourceMoneyRequestId": crypto.randomBytes(3*4).toString('base64'),
        "requestedFrom": {
                           "contactName": contact_name,
                           "language": "en",
                           "notificationPreferences": [{ "handle": contact_handle,
                                                           "handleType": type,
                                                           "active": true }]},
      "amount": amount,
      "currency": "CAD",
      "editableFulfillAmount": false,
      "requesterMessage": "Pay Me Now",
      "expiryDate": "2018-03-28T16:12:12.721Z" ,
      "supressResponderNotifications": false,
      "returnURL": "https://google.com" })

      };

      request.post(args, function (err, res, body) {

        if(err){
          console.log(err);
        }else{
          //data = JSON.parse(body);
          console.log(JSON.parse(body));
          context.succeed(
                generateResponse(
                buildSpeechletResponse("I have requested " + amount + " dollars from " + contact_name + " through Interac E-Tranfer!", true),
                  {}
              )
            )
         
        }

      });

    }

  });
            
            
            
            break;
            
          case "RequestMoneyFromContact":
            
            contact_name = event.request.intent.slots.contact.value;
            amount = event.request.intent.slots.amount.value;
            contact_handle = "6476061760"
            type = "sms";
            //requestMoneyFromOneTimeContact("Mark", 55, "clockfifty@gmail.com", "email");
            request.get(access_token_args, function (err, res, body) {
console.log(`2`)
    if(err){
      console.log(err);
    }else{

    data = JSON.parse(body);
    let access_token = data.access_token;

      let args = {
        url: "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
          "accessToken" : "Bearer " + access_token,
          "salt" : "TestingSalt",
          "requestId" : "1235967",
          "deviceId" : "lol798",
          "apiRegistrationId" : "CA1ARrWNRT44Kuep"
        },
        body: JSON.stringify({
        "sourceMoneyRequestId": crypto.randomBytes(3*4).toString('base64'),
        "requestedFrom": {
                           "contactName": contact_name,
                           "language": "en",
                           "notificationPreferences": [{ "handle": contact_handle,
                                                           "handleType": type,
                                                           "active": true }]},
      "amount": amount,
      "currency": "CAD",
      "editableFulfillAmount": false,
      "requesterMessage": "Pay Me Now",
      "expiryDate": "2018-03-28T16:12:12.721Z" ,
      "supressResponderNotifications": false,
      "returnURL": "https://google.com" })

      };

      request.post(args, function (err, res, body) {

        if(err){
          console.log(err);
        }else{
          //data = JSON.parse(body);
          console.log(JSON.parse(body));
          context.succeed(
                generateResponse(
                buildSpeechletResponse("I have requested " + amount + " dollars from " + contact_name + " through Interac E-Tranfer!", true),
                  {}
              )
            )
         
        }

      });

    }

  });
  
  break;

          case "AddContacts":
            var endpoint = "" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var viewCount = data.items[0].statistics.viewCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                    {}
                  )
                )
              })
            })
            break;

          case "ListContacts":
            console.log(event.request.intent.slots.SinceDate.value)
            var endpoint = "" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var viewCount = data.items[0].statistics.viewCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                    {}
                  )
                )
              })
            })
            break;

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}

// ===============================


var access_token_args = {
  url: "https://gateway-web.beta.interac.ca/publicapi/api/v1/access-tokens",
  headers: {
    "Accept" : "application/json",
    "Content-Type": "application/json",
    "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
    "salt" : "TestingSalt",
    "secretKey" : "G2jOB4mlf+9+g0j9GOYgjJzuTZBzeX5jF1T1D92LmEw="
  }
};

/**
Add contact.
*/
function addContact(contact_name, contact_handle, type){

  request.get(access_token_args, function (err, res, body) {

    if(err){
      console.log(err);
    }else{
      data = JSON.parse(body);
      let access_token = data.access_token;

      let args = {
        url: "https://gateway-web.beta.interac.ca/publicapi/api/v2/contacts",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
          "accessToken" : "Bearer " + access_token,
          "requestId" : "1235967",
          "deviceId" : "lol798",
          "apiRegistrationId" : "CA1ARrWNRT44Kuep"
        },
        body: JSON.stringify({
          "contactName" : contact_name,
          "language" : "en",
          "notificationPreferences" : [ { "handle" : contact_handle, "handleType" : type,
          "active" : true } ]
        })

      };

      request.post(args, function (err, res, body) {

        if(err){
          console.log(err);
        }else{
          contact_data = JSON.parse(body);
          console.log(contact_data);

          // TODO: SAVE contact_data.contactId and contact_data.contactHash in DB

          /* REQUEST TO ADDED CONTACT */
          // requestMoneyFromAddedContact(contact_name, 200, "clockfifty@gmail.com", "email", data.contactId, data.contactHash);
          // requestMoneyFromAddedContact(contact_name, 200, "555-555-5555", "phone", data.contactId, data.contactHash);

          /* SEND TO ONE TIME CONTACT */
          // requestMoneyFromOneTimeContact(contact_name, 200, "clockfifty@gmail.com", "email");
          // requestMoneyFromOneTimeContact(contact_name, 200, "555-555-5555", "phone");
        }

      });

    }

  });
}

function requestMoneyFromAddedContact(contact_name, amount, contact_handle, type, contactId, contactHash){

  request.get(access_token_args, function (err, res, body) {

    if(err){
      console.log(err);
    }else{
      data = JSON.parse(body);
      let access_token = data.access_token;

      let args = {
        url: "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
          "accessToken" : "Bearer " + access_token,
          "salt" : "TestingSalt",
          "requestId" : "1235967",
          "deviceId" : "lol798",
          "apiRegistrationId" : "CA1ARrWNRT44Kuep"
        },
        body: JSON.stringify({
        "sourceMoneyRequestId": crypto.randomBytes(3*4).toString('base64'),
        "requestedFrom": { "contactId": contactId,
                           "contactHash": contactHash,
                           "contactName": contact_name,
                           "language": "en",
                           "notificationPreferences": [{ "handle": contact_handle,
                                                           "handleType": type,
                                                           "active": true }]},
      "amount": amount,
      "currency": "CAD",
      "editableFulfillAmount": false,
      "requesterMessage": "Pay Me Now",
      "expiryDate": "2018-03-28T16:12:12.721Z" ,
      "supressResponderNotifications": false,
      "returnURL": "https://google.com" })

      };

      request.post(args, function (err, res, body) {

        if(err){
          console.log(err);
        }else{
          console.log(JSON.parse(body));
        }

      });

    }

  });


}



function requestMoneyFromOneTimeContact(contact_name, amount, contact_handle, type, context){
console.log(`1`)
  request.get(access_token_args, function (err, res, body) {
console.log(`2`)
    if(err){
      console.log(err);
    }else{

    data = JSON.parse(body);
    let access_token = data.access_token;

      let args = {
        url: "https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          "thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
          "accessToken" : "Bearer " + access_token,
          "salt" : "TestingSalt",
          "requestId" : "1235967",
          "deviceId" : "lol798",
          "apiRegistrationId" : "CA1ARrWNRT44Kuep"
        },
        body: JSON.stringify({
        "sourceMoneyRequestId": crypto.randomBytes(3*4).toString('base64'),
        "requestedFrom": {
                           "contactName": contact_name,
                           "language": "en",
                           "notificationPreferences": [{ "handle": contact_handle,
                                                           "handleType": type,
                                                           "active": true }]},
      "amount": amount,
      "currency": "CAD",
      "editableFulfillAmount": false,
      "requesterMessage": "Pay Me Now",
      "expiryDate": "2018-03-28T16:12:12.721Z" ,
      "supressResponderNotifications": false,
      "returnURL": "https://google.com" })

      };

      request.post(args, function (err, res, body) {

        if(err){
          console.log(err);
        }else{
          //data = JSON.parse(body);
          console.log(JSON.parse(body));
          context.succeed(
                generateResponse(
                buildSpeechletResponse("My mans send money", true),
                  {}
              )
            )
         
        }

      });

    }

  });

}
