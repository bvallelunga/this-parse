var Image = require("parse-image")

module.exports = function(image, box) {
	return Parse.Cloud.httpRequest({
	  url: image.url()
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
	    width: box,
	    height: box
	  })
	}).then(function(image) {
	  return image.setFormat("JPEG")
	}).then(function(image) {  
		return image.data()
	}).then(function(buffer) {
	  return new Parse.File("thumbnail.jpg", {
		  base64: buffer.toString("base64") 
		}).save()
	})
}