var Image = require("parse-image")

Parse.Cloud.beforeSave("Photo", function(req, res) {  
  var object = req.object
  
  Parse.Promise.as().then(function() {
	  var original = object.get("original")
		
		if(!object.dirty("original") || original == null) {
			return true
		}
		
		return thumbnail(object)
	}).then(function() {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})

function thumbnail(object) {
	return Parse.Cloud.httpRequest({
	  url: object.get("original").url()
	}).then(function(response) {
	  var image = new Image()
	  return image.setData(response.buffer)
	}).then(function(image) {
	  var size = Math.min(image.width(), image.height());
	  
	  return image.crop({
	    left: (image.width() - size) / 2,
	    top: (image.height() - size) / 2,
	    width: size,
	    height: size
	  })
	}).then(function(image) {
	  return image.scale({
	    width: 250,
	    height: 250
	  })
	}).then(function(image) {
	  return image.setFormat("JPEG")
	}).then(function(image) {  
		return image.data()
	}).then(function(buffer) {
	  return new Parse.File("thumbnail.jpg", {
		  base64: buffer.toString("base64") 
		}).save()
	}).then(function(cropped) {
	  return object.set("thumbnail", cropped)
	})
}