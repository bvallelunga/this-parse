var Image = require("parse-image")
var Thumbnail = require("cloud/utils/thumbnail")

Parse.Cloud.beforeSave("Photo", function(req, res) {  
  var object = req.object
  
  Parse.Promise.as().then(function() {
	  var original = object.get("original")
		
		if(!object.dirty("original") || original == null) {
			return true
		}
		
		return Thumbnail(original, 250).then(function(cropped) {
			return object.set("thumbnail", cropped)
		})
	}).then(function() {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})