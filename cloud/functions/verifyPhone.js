var Twilio = require('twilio')
var User = Parse.User

Parse.Cloud.define("verifyPhone", function(req, res) {
	var sid = "ACdf6e01e0d0cd943e9aa2a45d6117d624"
  var token = "addf9c4db22654ab9b978999e319dd70"
  var client = Twilio(sid, token)

	return client.sendSms({
    to: req.params.phone,
    from: "+18312004372",
    body: "#this code: " + req.params.code
  }, function(err, responseData) {
    if(err) return res.error(error.description)
        
    var query = new Parse.Query(User)
	
		query.equalTo("phone", req.params.phone)
		
		return query.first().then(function(user) {
			res.success(user ? ("@" + user.get("username")) : null)
		}, function(error) {
			res.error(error.description)
		})
  })
})