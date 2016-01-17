var Thumbnail = require("cloud/utils/thumbnail")

Parse.Cloud.beforeSave(Parse.User, function(req, res) {  
  var object = req.object
  
  Parse.Promise.as().then(function() {
	  var photo = object.get("photo")
		
		if(!object.dirty("photo") || photo == null) {
			return true
		}
		
		return Thumbnail(photo, 250).then(function(cropped) {
			return object.set("photo", cropped)
		})
	}).then(function() {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})