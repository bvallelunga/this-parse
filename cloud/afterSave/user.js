Parse.Cloud.afterSave(Parse.User, function(req, res) {
  var object = req.object

  if(object.existed()) return
	
	// Add Pending
	var query = new Parse.Query("Pending")
	
	query.equalTo("phone", object.get("phone"))
	
	return query.each(function(pending) {
		var tag = pending.get("tag")
		
		tag.relation("followers").add(object)
		
		return tag.save()
	})
})