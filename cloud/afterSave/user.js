Parse.Cloud.afterSave(Parse.User, function(req, res) {
  var object = req.object

  if(object.existed()) return
	
	// Add Pending
	var query = new Parse.Query("Pending")
	
	query.equalTo("phone", object.get("phone"))
	
	return query.each(function(pending) {
		var tag = pending.get("tag")
		var user = pending.get("user")
		
	  // Add Friend
	  if(user) {
	  	object.relation("friends").add(user)
	  	user.relation("friends").add(object)
	  	user.save()
	  	object.save()
	  }
		
		tag.relation("followers").add(object)
		
		return tag.save().then(function() {
			if(!user) return
			
			return user.save().then(function() {
				return object.save()
			})
		})
	})
})