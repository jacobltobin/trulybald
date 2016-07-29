$(document).ready(function() {
	$('.audio-player').each(function(i, e) {
		TrulyBaldAudioPlayer.createAudioPlayer(e)
	})
})