var User = Parse.User

Parse.Cloud.define("loginPhone", function(req, res) {
	var query = new Parse.Query(User)
	
	query.equalTo("phone", req.params.phone)
	
	query.first().then(function(user) {
		res.success(user.getSessionToken())
	}, function(error) {
		res.error(error.description)
	})
})