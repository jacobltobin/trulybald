/*

    // IDEAS
    // different states for different patterns
    // more sounds
    // different colored tails

*/

////////////////////////////////////////////////////////////////////
// Boot (Should always be named boot)
////////////////////////////////////////////////////////////////////
WX_P.interactiveStates.Boot = function(game) {};
WX_P.interactiveStates.Boot.prototype = {
    init: function() {
        WX_P.configure(this);
        this.load.baseURL = 'scripts/cluster/';
    },
    preload: function() {
        this.stage.backgroundColor = '#000000';

        // preloader
        this.load.image('back', 'images/preloader_background.png');
        this.load.image('arrow_head', 'assets/sprites/arrow_head.png');

        this.load.audio('click', ['assets/sounds/click.wav']);
        this.load.audio('guit1', ['assets/sounds/guit1.wav']);
        this.load.audio('guit2', ['assets/sounds/guit2.wav']);
        this.load.audio('guit3', ['assets/sounds/guit3.wav']);
        this.load.audio('guit4', ['assets/sounds/guit4.wav']);
        this.load.audio('guit5', ['assets/sounds/guit5.wav']);
        this.load.audio('guit6', ['assets/sounds/guit6.wav']);
        this.load.audio('guit7', ['assets/sounds/guit7.wav']);
        this.load.audio('guit8', ['assets/sounds/guit8.wav']);
        this.load.audio('guit9', ['assets/sounds/guit9.wav']);
        this.load.audio('guit10', ['assets/sounds/guit10.wav']);
        this.load.audio('guit11', ['assets/sounds/guit11.wav']);
        this.load.audio('guit12', ['assets/sounds/guit12.wav']);
        this.load.audio('guit13', ['assets/sounds/guit13.wav']);
        this.load.audio('guit14', ['assets/sounds/guit14.wav']);
        this.load.audio('guit15', ['assets/sounds/guit15.wav']);
        this.load.audio('bass1', ['assets/sounds/bass1.wav']);
        this.load.audio('bass2', ['assets/sounds/bass2.wav']);
        this.load.audio('bass3', ['assets/sounds/bass3.wav']);
        this.load.audio('bass4', ['assets/sounds/bass4.wav']);

        this.load.json('words', 'assets/json/words.json');
    },
    create: function() {},
    resize: function() {}
};

////////////////////////////////////////////////////////////////////
// Main interaction state
////////////////////////////////////////////////////////////////////
WX_P.interactiveStates.Level_main = function(game) {};
WX_P.interactiveStates.Level_main.prototype = {
    create: function() {

        // phaser state
        _PS = this;

        // all them words
        this.words = this.cache.getJSON('words');
        this.words = this.words.words;
        this.wordsG = this.add.group();
        
        // background
        this.stage.backgroundColor = '#111111';
        this.HSL = Phaser.Color.HSLColorWheel();

        this.sounds = [];
        this.addSound = function(item, index, list) {
            var sound = _PS.add.sound(item.url.split('sounds/')[1].split('.')[0], 1, false);
            _PS.sounds.push(sound);
        }

        _.each(this.cache._sounds, this.addSound);

        // sound
        this.click = this.add.sound('click',1,false);

        // graphics thing
        this.bmd = null;
        this.bmd = this.add.bitmapData(WX_P.basew, WX_P.baseh);
        this.bmd.addToWorld();

        // array of arrow cycles to update
        this.cycles = {
            children: []
        };

        // this.HSL = Phaser.Color.HSLColorWheel(1,.5);
        this.makeColorString = function(i) {
            var color = this.HSL[i];
            return 'rgba('+color.r+','+color.g+','+color.b+',1)';
        }

        function arrowCycle(points, index, cpHandler) {

            // proppies
            this.pathReset = true;
            this.index = index;
            this.cpHandler = cpHandler;
            this.points = points;
            this.pi = 0;
            this.arrow = _PS.add.sprite(0,0,'arrow_head');
            this.arrow.anchor.set(.5,.5);

            // creates the path array we go 'round
            this.createPath = function() {
                this.path = [];
                var x = 1 / 3000;
                var ix = 0;
                var il = 0;
                for (var i = 0; i <= 1; i += x) {
                    // var px = _PS.math.bezierInterpolation(this.points.x, i);
                    // var py = _PS.math.bezierInterpolation(this.points.y, i);
                    var px = _PS.math.linearInterpolation(this.points.x, i);
                    var py = _PS.math.linearInterpolation(this.points.y, i);
                    var node = { x: px, y: py, angle: 0, boop: false };
                    if (Math.round(px) == Math.round(this.points.x[il])) {
                        node.boop = true;
                        il++;
                    }
                    if (ix > 0) {
                        node.angle = _PS.math.angleBetweenPoints(this.path[ix - 1], node);
                    }
                    this.path.push(node);
                    ix++;
                }
            }

            // drawing dots along the path
            this.draw = function() {

                if (this.pathReset) {
                    this.createPath();
                    this.pathReset = false;
                }

                // the head
                this.arrow.x = this.path[this.pi].x;
                this.arrow.y = this.path[this.pi].y;
                this.arrow.rotation = this.path[this.pi].angle;
                if (this.pi-1 > 0) {
                    var vol = (this.path[this.pi].x-(this.path[this.pi-1].x));
                    var vol = Math.abs(vol)/20;
                    // _PS.click.play('', 0, vol, false, true);
                    var wordcount = 0;
                    if (this.path[this.pi].boop) {
                        if (_PS.wordsG.children[5]) {
                            _PS.wordsG.children[0].destroy();
                        }
                        wI = Math.round(Math.random()*7362)
                        var word = _PS.words[wI];
                        var random = Math.abs(Math.round(Math.random()*_PS.sounds.length-1));
                        console.log(random)
                        _PS.sounds[random].play('', 0, 1, false, true);
                        var text = _PS.add.text(this.path[this.pi].x, this.path[this.pi].y, word, {fill: '#ffffff', font: "22px courier"});
                        _PS.wordsG.add(text);
                    }
                }

                // the tail
                for (var i = 0; i < 300; i++) {

                    // this.color = _PS.makeColorString(Math.round(i*3.6));
                    this.color = 'rgba(0,0,250,1)';
                    if (this.pi-i > 0 && this.pi-i < this.path.length){
                        _PS.bmd.circle( this.path[this.pi-i].x, this.path[this.pi-i].y, 1, this.color );
                    }
                    if (this.pi-i < 0) {
                        var ov = this.path.length - Math.abs(this.pi-i);
                        _PS.bmd.circle( this.path[ov].x, this.path[ov].y, 1, this.color );
                    }

                }
                // draw the points
                for (var p = 0; p < this.points.x.length; p++) {
                    var x = this.points.x[p]-3,
                        y = this.points.y[p]-3;
                    _PS.bmd.rect( x, y, 5, 5, 'rgba(255, 0, 100, 1)' );
                    if (!this.textAdded) {
                        // _PS.add.text(x+5, y+5, p.toString(), {fill: '#0B314E', font: "22px Arial"});
                    }
                }
                this.textAdded = true;

                if (!this.paused) {
                    this.pi+=5;
                }

                if (this.pi >= this.path.length) {
                    _PS.makeBouncer();
                    this.pi = 0;
                }

                if (_PS.cycles.children.length > 6) {
                    this.paused = true;
                }
            }

            _PS.cycles.children.push(this);

        }

        this.plot = function() {
            _PS.bmd.clear();
            $(_PS.cycles.children).each(function(s, t) {
                t.draw();
            });
        }

        this.makeBouncer = function() {
            var points = {x:[],y:[]};
            for (var j = 0; j < 50; j++) {
                points.x.push(Math.random()*10*100+50);
                points.y.push(Math.random()*10*100+50);
            }
            points.x.push(points.x[0]);
            points.y.push(points.y[0]);
            var cpHandler = function(speed) {}
            this.tradeWinds = new arrowCycle(points, 1, cpHandler);
        }
        this.makeBouncer();

        $(window).on('keydown', function(e) {
            if (e.keyCode == 32) {
                $(_PS.cycles.children).each(function(s,t) {
                    t.paused = !t.paused ? true : false;
                });
            }
        });

        WX_P.popResize(this);
    },
    update: function() {
        this.plot();
    },
    resize: function() {
        WX_P.popResize(this);
    }
};

////////////////////////////////////////////////////////////////////
// Window load.
// Set up jQuery UI controls and init (init defined in wxstem_phaser)
////////////////////////////////////////////////////////////////////
$(window).load(function() {
    $("#wind-speed").slider({
        value: 0,
        min: -50,
        max: 50,
        step: 1
    });
    WX_P.init('interactive-container', 1140, 1100);

});