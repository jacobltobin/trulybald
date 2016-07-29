(function() {

    var t = {};

    var exporter = function(name, item) {
        window[name] = item;
    }

    var init = function() {
        exporter('TrulyBaldAudioPlayer', t);
    }

    t.createAudioPlayer = function(element) {
    	var e = $(element);
    	
    };

    init();
}());