var Tag = Parse.Object.extend("Tag")
var Photo = Parse.Object.extend("Photo")

Parse.Cloud.define("trending", function(req, res) {	
	var query = new Parse.Query(Tag)
	var photoQuery = new Parse.Query(Photo)
	
	photoQuery.exists("original")
	photoQuery.greaterThan("expireAt", new Date())
	photoQuery.notEqualTo("flagged", true)
	
	query.matchesQuery("photos", photoQuery)
	query.descending("followerCount")
	query.descending("updatedAt")
	query.limit(15)
	
	return query.find().then(function(tags) {				
		return res.success(tags)
	}, function(error) {
		return res.error(error.description)
	})
})