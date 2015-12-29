var nouns = require("cloud/words/nouns")
var adjectives = require("cloud/words/adjectives")
var Tag = Parse.Object.extend("Tag")
var Photo = Parse.Object.extend("Photo")

Parse.Cloud.define("newTag", function(req, res) {	
	return findTag().then(function(tag) {
		return res.success("#" + tag)
	})
})

function findTag() {
	var query = new Parse.Query(Tag)
	var photoQuery = new Parse.Query(Photo)
	var tag = randomTag()
	
	photoQuery.greaterThan("expireAt", new Date())
	query.matchesQuery("photos", photoQuery)
	query.equalTo("name", tag)
	
	return query.count().then(function(count) {
		if(count > 0) return findTag()
				
		return tag
	})
}

function randomTag() {
	var noun = nouns[rand(nouns.length)]
	var adjective = adjectives[rand(adjectives.length)]

	return adjective + noun
}

function rand(limit) {
	return Math.floor(Math.random() * limit)
}