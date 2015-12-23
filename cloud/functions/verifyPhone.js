var Twilio = require('twilio')

Parse.Cloud.define("verifyPhone", function(req, res) {
	var sid = "ACdf6e01e0d0cd943e9aa2a45d6117d624"
  var token = "addf9c4db22654ab9b978999e319dd70"
  var client = Twilio(sid, token)

  return Parse.Promise.as().then(function() {
	  return client.sendSms({
	    to: req.params.phone,
	    from: "+18312004372",
	    body: "#this code: " + req.params.code
	  })
  }).then(function() {
		res.success("Twilio SMS code sent!")	  
  }, function(error) {
	  res.error(error.description)
  })
})