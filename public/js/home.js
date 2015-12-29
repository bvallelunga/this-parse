$(function() {
	$(".video").bind('progress loadeddata', function(response) {
		var percent = this.buffered.end(0) / this.duration

  	if(percent > 0.3) this.play()
	})
})