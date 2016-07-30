$(document).ready(function() {
	$('.audio-player').each(function(i, e) {
		new AudioPlayer(e);
	})
})