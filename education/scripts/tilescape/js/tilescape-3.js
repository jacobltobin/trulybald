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

		this.majorScale = sc.Scale.major("just").degreeToFreq(sc.Range(7), 440).asInteger();

		this.GridMatrix = function() {
			this.local = {
				x: 80,
				y: 80
			}
			this.dimensions = {
				x: 50,
				y: 20
			}
			this.tileDimensions = {
				x: 20,
				y: 40,
				z: 20
			}
			this.buildTileTexture = function() {
				var tileGraphic = _PS.add.graphics(-9990, -9990);
				tileGraphic.beginFill(0xFFFFFF)
				tileGraphic.lineStyle(1, 0xff0000, 1);
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
					this.fire(sprite, 'rotation', Math.PI*10, 20000, null, resetSpin)
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
				var sine1 = T(wave, {freq: (matrixPosition.x*20 + (200-matrixPosition.y*60)), mul:0.1});
				T("perc", {r:release}, sine1).on("ended", function() {
					this.pause();
				}).bang().play();
			};

			this.getNeighborIndexes = function(matrixIndex) {
				return [
					matrixIndex - _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y) - 8,
					matrixIndex - _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y),
					matrixIndex - _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y) + 8,
					matrixIndex + (this.matrixPosition.y) - 8,
					matrixIndex + _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y) + 8,
					matrixIndex + _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y),
					matrixIndex + _PS.gridMatrix.dimensions.x*3 + (this.matrixPosition.y) - 8,
					matrixIndex + (this.matrixPosition.y) + 8
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
				this.doTween('scale', {x: .8, y: .8});
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
					tile.playSound('sin', 8000);
				});
			}

			this.sprite.inputEnabled = true;
			this.sprite.events.onInputOver.add(this.onHover, this);
			this.sprite.events.onInputDown.add(this.onDown, this);
		}

		this.gridMatrix = new this.GridMatrix();
		this.gridMatrix.init();

		var animIndex = 0;
		setInterval(function() {
			_PS.gridMatrix.tiles[animIndex].doTween('spin');
			++animIndex;
			if (animIndex >= _PS.gridMatrix.tiles.length) {
				animIndex = 0;
			}
		}, 30);

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