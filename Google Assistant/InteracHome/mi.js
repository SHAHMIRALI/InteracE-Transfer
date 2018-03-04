//Example POST method invocation
const request = require('request')

// set content-type header and data as json in args parameter
var args = {
    url: "https://gateway-web.beta.interac.ca/publicapi/api/v1/test/encrypted-key",
    headers: {
	"Content-Type": "application/json",
	"Accept" : "application/json",
	"thirdPartyAccessId" : "CA1TAgKguDJVMU5a",
	"salt" : "TestingSalt",
	"secretKey" : "QMTPjQC7o8iJq3BpOcK-I-hOb9VFL0h6kWN1R66hmRI"
	}
};

request.get(args, function (err, res, body) {

    if(err){
    	console.log(err);
    }else{

    	data = JSON.parse(body);

    	// parsed response body as js object
	console.log(data);
    }
});
