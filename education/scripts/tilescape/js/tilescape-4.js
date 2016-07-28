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
		this.load.baseURL = 'scripts/tilescape/';
	},
	preload: function() {
		this.stage.backgroundColor = '#ffffff';

		// preloader
		this.load.image('back', 'images/preloader_background.png');
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

		// keyboard to control scales
		// keyboard to control intervals
		// colors change with scales
		// computer reads random fb messages
		// LED lights

		// bastanikar
		// egyptian
		// chinese
		// gong
		// hexauolean
		// husseini
		// huzam
		// iraq
		// iwato
		// jiao <- in seq
		var scales = [
		'bastanikar',
		'egyptian',
		'chinese',
		'gong',
		'hexauolean',
		'husseini',
		'huzam',
		'iraq',
		'iwato',
		'jiao'
		];
		scaleCurrent = 0;
		this.scale = sc.Scale.iwato().degreeToFreq(sc.Range(8), 440).asInteger();

		this.intervalLR = 3;
		this.intervalUD = 3;

		this.GridMatrix = function() {
			this.local = {
				x: 80,
				y: 80
			}
			this.dimensions = {
				x: 28,
				y: 28
			}
			this.tileDimensions = {
				x: 30,
				y: 30,
				z: 20
			}
			this.buildTileTexture = function() {
				var tileGraphic = _PS.add.graphics(-9990, -9990);
				tileGraphic.beginFill(0xffffff)
				tileGraphic.lineStyle(1, 0x0000ff, 1);
				tileGraphic.drawRect(0, 0, this.tileDimensions.x, this.tileDimensions.y);
				this.tileTexture = tileGraphic.generateTexture();
			}
			this.tiles = [];
			this.buildTiles = function() {
				for (var k = 0, l = this.dimensions.y; k < l; k++) {
					for (var i = 0, j = this.dimensions.x; i < j; i++) {
						this.tiles.push(
							new _PS.GridTile(
								(i * this.tileDimensions.x)+this.local.x,
								(k * this.tileDimensions.y)+this.local.y,
								0,
								{x: i, y: k},
								this.tileTexture
							)
						);
					}
				}
			}
			this.matrixPositionToIndex = function(matrixPosition) {
				return matrixPosition.y*(this.dimensions.x-1) + matrixPosition.x;
			}
			this.init = function() {
				this.buildTileTexture();
				this.buildTiles();
			}
		}

		this.GridTile = function(x, y, z, matrixPosition, texture) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.matrixPosition = matrixPosition;
			this.sprite = _PS.add.sprite(x, y, texture);
			this.sprite.anchor.set(.5, .5);
			// this.sprite.tint = 0xff0000;

			this.animations = {
				fire: function(obj, parameter, value, speed, onUpdate, onComplete) {
					var tween = _PS.add.tween(obj);
					tween.to({ [parameter] : value }, speed, Phaser.Easing.Linear.In);
					onUpdate ? tween.onUpdateCallback(onUpdate, this) : 1+0;
					onComplete ? tween.onComplete.add(onComplete, this) : 1+0;
					tween.start();
				},
				spin: function(sprite) {
					var resetSpin = function() {
						sprite.rotation = 0;
					}
					this.fire(sprite, 'rotation', Math.PI*10, 17200, null, resetSpin)
				},
				scale: function(sprite, options) {
					var x = options ? options.x : .5,
						y = options ? options.y : .5;
					var resetScale = function() {
						this.fire(sprite.scale, 'x', 1, 250);
						this.fire(sprite.scale, 'y', 1, 250);
					}
					this.fire(sprite.scale, 'x', x, 250, resetScale);
					this.fire(sprite.scale, 'y', y, 250, resetScale);
				},
				tint: function(sprite, options) {
					var resetTint = function() {
						var colorBlend = {step: 0};
						var colorTween = _PS.add.tween(colorBlend).to({step: 100}, 5000);
						colorTween.onUpdateCallback(function() {
							sprite.tint = Phaser.Color.interpolateColor(options.color, 0xFFFFFF, 100, colorBlend.step);
						});
						colorTween.start();
					}
					var colorBlend = {step: 0};
					var colorTween = _PS.add.tween(colorBlend).to({step: 100}, 250);
					colorTween.onUpdateCallback(function() {
						sprite.tint = Phaser.Color.interpolateColor(0xFFFFFF, options.color, 100, colorBlend.step);
					});
					colorTween.onComplete.add(resetTint, this);
					sprite.tint = 0xFFFFFF;
					colorTween.start();
				}
			}

			this.playSound = function(wave, release) {
				var sine1 = T(wave, {freq: _PS.scale[(matrixPosition.x+matrixPosition.y)%8], mul:0.01});
				T("perc", {r:release, a: 500}, sine1).on("ended", function() {
					this.pause();
				}).bang().play();
			};

			this.getNeighborIndexes = function(matrixIndex) {
				return [
					matrixIndex - _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y) - _PS.intervalLR,
					matrixIndex - _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y),
					matrixIndex - _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y) + _PS.intervalLR,
					matrixIndex + (this.matrixPosition.y) - _PS.intervalLR,
					matrixIndex + _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y) + _PS.intervalLR,
					matrixIndex + _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y),
					matrixIndex + _PS.gridMatrix.dimensions.x*_PS.intervalUD + (this.matrixPosition.y) - _PS.intervalLR,
					matrixIndex + (this.matrixPosition.y) + _PS.intervalLR
				]
			};
			this.doTween = function(id, options) {
				if (options != null) {
					this.animations[id](this.sprite, options)
				} else {
					this.animations[id](this.sprite);
				}
			}
			this.onHover = function(sprite, pointer) {
				this.doTween('scale', {x: .9, y: .9});
				// this.doTween('tint', {color: 0xff0000});
				// this.playSound('sin', 100);
			}
			this.onDown = function(sprite, pointer) {
				this.doTween('scale');
				this.doTween('tint', {color: 0x0000FF});

				var matrixIndex = _PS.gridMatrix.matrixPositionToIndex(this.matrixPosition);
				var neighborIndexes = this.getNeighborIndexes(matrixIndex);
				$(neighborIndexes).each(function(i, v) {
					var tile = _PS.gridMatrix.tiles[v];
					tile.doTween('scale');
					tile.doTween('spin');
					tile.doTween('tint', {color: 0x00FF00});
					tile.playSound('pulse', 8000);
				});
			}

			this.sprite.inputEnabled = true;
			this.sprite.events.onInputOver.add(this.onHover, this);
			this.sprite.events.onInputDown.add(this.onDown, this);
		}

		this.gridMatrix = new this.GridMatrix();
		this.gridMatrix.init();

		var animIndex = 0;
		var worldC = true;
		setInterval(function() {
			_PS.gridMatrix.tiles[animIndex].doTween('spin');
			_PS.gridMatrix.tiles[animIndex].playSound('sin', 100);
			++animIndex;
			if (animIndex >= _PS.gridMatrix.tiles.length) {
				animIndex = 0;
			}
			
			if (worldC && _PS.world.rotation < .04) {
				_PS.world.rotation += .0001;
				_PS.world.scale.x += .0002;
				if (_PS.world.rotation > .04) {
					worldC = false;
				}
			} else {
				_PS.world.rotation -= .0001;
				_PS.world.scale.x -= .0002;
				if (_PS.world.rotation < -.04) {
					worldC = true;
				}
			}
		}, 30);

		// var scaleIndex = 0;
		// setInterval(function() {
		// 	_PS.scale = sc.Scale[sc.ScaleInfo.names()[scaleIndex]]().degreeToFreq(sc.Range(8), 440).asInteger();
		// 	console.log(sc.ScaleInfo.names()[scaleIndex]);
		// 	++scaleIndex;
		// }, 5000)

		$(document).keypress(function(e){
			console.log(e.which);
		    if (e.which == 97) {
		    	++scaleCurrent;
		    	_PS.scale = sc.Scale[scales[scaleCurrent]]().degreeToFreq(sc.Range(8), 440).asInteger();
		    	scaleCurrent = scaleCurrent > scales.length ? 0 : scaleCurrent;
		    }
		    if (e.which == 113) {
		    	++_PS.intervalLR;
		    	++_PS.intervalUD;
		    }
		    if (e.which == 119) {
		    	--_PS.intervalLR;
		    	--_PS.intervalUD;
		    }
		});

		// WX_P.popResize(this);
	},
	update: function() {},
	resize: function() {
		// WX_P.popResize(this);
	}
};

////////////////////////////////////////////////////////////////////
// Window load.
// Set up jQuery UI controls and init (init defined in wxstem_phaser)
////////////////////////////////////////////////////////////////////
$(window).load(function() {
	WX_P.init('interactive-container', 1140, 1100);
});