var Tag = Parse.Object.extend("Tag")
var Photo = Parse.Object.extend("Photo")

Parse.Cloud.define("following", function(req, res) {	
	var query = new Parse.Query(Tag)
	var photoQuery = new Parse.Query(Photo)
	var user = Parse.User.current()
	
	if(!user && req.params.user) {
		user = new Parse.User()
		user.id = req.params.user	
	}
	
	//photoQuery.exists("original")
	photoQuery.greaterThan("expireAt", new Date())
	photoQuery.notEqualTo("flagged", true)
	
	query.matchesQuery("photos", photoQuery)
	query.equalTo("followers", user)
	query.descending("updatedAt")
	query.descending("followerCount")
	
	return query.find().then(function(tags) {				
		return res.success(tags)
	}, function(error) {
		console.log(error)
		return res.error(error.description)
	})
})