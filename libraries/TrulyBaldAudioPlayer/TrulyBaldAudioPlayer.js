(function() {

    var t = {};

    var exporter = function(name, item) {
        window[name] = item;
    }

    var init = function() {
        exporter('TrulyBaldAudioPlayer', t);
    }

    t.createAudioPlayer = function(element) {
    	var e = element;
    	var filePath = e.getAttribute('data-file');
    	
    	var audio = new Audio(filePath);

    	audio.preload = 'none';

    	e.innerHTML = audio;
    };

    init();
}());