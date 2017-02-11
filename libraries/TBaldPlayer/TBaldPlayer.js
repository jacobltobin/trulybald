(function() {

    var exporter = function(name, item) {
        window[name] = item;
    }

    var init = function() {
        exporter('AudioPlayer', AudioPlayer);
    }

    var AudioPlayer = function(element) {
    	// hi
    	ap = this;
    	this.audio = new Audio();
    	this.container = element;
    	this.playHandler = new PlayHandler(ap);
    	this.controlHandler = new ControlHandler(ap);
    	this.tracks = $(this.container).find('.track');
    	this.trackIndex = 0;
    	this.playHandler.switchTrack(this.trackIndex);
    };

    var ControlHandler = function(audioPlayer) {
    	// hi
    	var self = this;

    	// define
    	this.controls = {
    		play: $(audioPlayer.container).find('.play-button'),
    		next: $(audioPlayer.container).find('.next-button'),
    		prev: $(audioPlayer.container).find('.previous-button'),
    		trackPlay: $(audioPlayer.container).find('.track-play-button'),
    		timeBar: {
    			buffer: $(audioPlayer.container).find('.time-bar-buffer-background'),
    			played: $(audioPlayer.container).find('.time-bar-played-background'),
    			handle: $(audioPlayer.container).find('.time-bar-handle')
    		}
    	};

    	// initiate

        this.controls.timeBar.nudge = function(val) {
        	this.set();
        	var v = val ? val : audioPlayer.audio.currentTime;
        	console.log(audioPlayer.audio.duration);
        };
        this.controls.timeBar.set = function() {
        };

        // attach
        this.controls.play.click(function() {
        	audioPlayer.playHandler.playToggle();
        	$(this).toggleClass('active');
        });
        this.controls.next.click(function() {
        	audioPlayer.playHandler.goToNextTrack();
        });
        this.controls.prev.click(function() {
        	audioPlayer.playHandler.goToPrevTrack();
        });
        this.controls.trackPlay.click(function() {
        	audioPlayer.playHandler.switchTrack($(this).parent().index());
        	self.toggleActiveTrack(this);
        	self.toggleMainPlay();
        });

        // actions
        this.toggleActiveTrack = function(control) {
        	$(this.controls.trackPlay).removeClass('active');
        	$(control).toggleClass('active');
        };
        this.toggleMainPlay = function() {
        	$(this.controls.play).toggleClass('active');
        };
        this.highlightTrack = function(trackIndex) {
        	$(audioPlayer.tracks).removeClass('active-track');
        	$(audioPlayer.tracks[trackIndex]).toggleClass('active-track');
        };
    };

    // abstract
    var PlayHandler = function(audioPlayer) {
    	// hi
    	var self = this;
    	this.isPlaying = false;
    	this.currentTrack = {
    		duration: 0
    	};

    	// on update
    	audioPlayer.audio.addEventListener('timeupdate', function() {
    		audioPlayer.controlHandler.controls.timeBar.nudge();
    	});

    	// actions
    	this.goToNextTrack = function() {
    		audioPlayer.trackIndex += 1;
    		this.switchTrack(audioPlayer.trackIndex);
    		this.isPlaying ? audioPlayer.audio.play() : null;
    	};
    	this.goToPrevTrack = function() {
    		audioPlayer.trackIndex -= 1;
    		this.switchTrack(audioPlayer.trackIndex);
    		this.isPlaying ? audioPlayer.audio.play() : null;
    	};
    	this.switchTrack = function(trackIndex) {
    		audioPlayer.trackIndex = trackIndex;
    		var file = $(audioPlayer.tracks[trackIndex]).attr('data-file');
        	audioPlayer.audio.src = file;
        	audioPlayer.controlHandler.highlightTrack(audioPlayer.trackIndex);
    	};
        this.playToggle = function() {
        	this.isPlaying ? audioPlayer.audio.pause() : audioPlayer.audio.play();
        	this.isPlaying = this.isPlaying ? false : true;
        };
    };


    init();

}());