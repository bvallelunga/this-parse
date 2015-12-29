var Tag = Parse.Object.extend("Tag")
var Photo = Parse.Object.extend("Photo")

Parse.Cloud.define("following", function(req, res) {	
	var query = new Parse.Query(Tag)
	var photoQuery = new Parse.Query(Photo)
	var user = Parse.User.current()
	
	photoQuery.greaterThan("expireAt", new Date())
	photoQuery.exists("original")
	
	query.matchesQuery("photos", photoQuery)
	query.equalTo("followers", user)
	query.descending("updatedAt")
	query.descending("followerCount")
	
	return query.find().then(function(tags) {				
		return res.success(tags)
	}, function(error) {
		return res.error(error.description)
	})
})