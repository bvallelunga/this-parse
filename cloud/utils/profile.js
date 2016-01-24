var Image = require("parse-image")

module.exports = function() {	
	return Parse.Config.get().then(function(config) {
		var random = Math.floor(Math.random() * (52 - 1)) + 1
		var url = config.get("host") + "/avatars/" + random + ".jpg"	
		
		console.log(url)
		
		return Parse.Cloud.httpRequest({
		  url: url,
		  followRedirects: true
		})
	}).then(function(response) {
	  var image = new Image()
	  return image.setData(response.buffer)
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