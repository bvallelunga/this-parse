var Image = require("parse-image")

Parse.Cloud.beforeSave("Photo", function(req, res) {  
  var object = req.object
  var original = object.get("original")

	if(original == null || !object.dirty("original")) {
    return res.success()
  }
	
	Parse.Cloud.httpRequest({
	  url: original.url()
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
	  object.set("thumbnail", cropped)
	}).then(function(result) {
	  res.success()
	}, function(error) {
	  res.error(error)
	})
})