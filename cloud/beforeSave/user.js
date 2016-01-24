var Thumbnail = require("cloud/utils/thumbnail")
var Profile = require("cloud/utils/profile")

Parse.Cloud.beforeSave(Parse.User, function(req, res) {  
  var object = req.object
  
  Parse.Promise.as().then(function() {
	  var photo = object.get("photo")
		
		if(photo == null)
			return Profile()
		else if(!object.dirty("photo"))
			return Thumbnail(photo, 250)
			
		return false
	}).then(function(cropped) {
		if(cropped === false) 
			return true
		
		return object.set("photo", cropped)
	}).then(function() {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})