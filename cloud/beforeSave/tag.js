Parse.Cloud.beforeSave("Tag", function(req, res) {  
  var object = req.object
  
	if(object.isNew()) {
  	object.set("followerCount", 0)
		object.set("photoCount", 0)
		return res.success()
	}
  
  Parse.Promise.as().then(function() {
		return followerCount(object)
	}).then(function() {
		return photoCount(object)
	}).then(function() {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})

function followerCount(object) {
	var query = object.relation("followers").query()
	
	return query.count().then(function(count) {
		return object.set("followerCount", count)
	})
}

function photoCount(object) {
	var query = object.relation("photos").query()
	var date = new Date()
	
	query.greaterThan("expireAt", date)
	
	return query.count().then(function(count) {
		return object.set("photoCount", count)
	})
}