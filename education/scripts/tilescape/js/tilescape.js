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
		this.stage.backgroundColor = '#000000';

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

		this.GridMatrix = function() {
			this.local = {
				x: WX_P.basew / 2,
				y: WX_P.basey / 2
			}
			this.dimensions = {
				x: 17,
				y: 17
			}
			this.tileDimensions = {
				x: 70,
				y: 70,
				z: 20
			}
			this.buildTileTexture = function() {
				var tileGraphic = _PS.add.graphics(-9990, -9990);
				tileGraphic.beginFill(0xFFFFFF)
				tileGraphic.lineStyle(3, 0xff0000, 1);
				tileGraphic.drawRect(0, 0, this.tileDimensions.x, this.tileDimensions.y);
				this.tileTexture = tileGraphic.generateTexture();
			}
			this.tiles = [];
			this.buildTiles = function() {
				for (var k = 0, l = this.dimensions.y; k < l; k++) {
					for (var i = 0, j = this.dimensions.x; i < j; i++) {
						this.tiles.push(new _PS.GridTile(i * this.tileDimensions.x, k * this.tileDimensions.y, 0, {x: i, y: k}, this.tileTexture));
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
					tween.to({ [parameter] : value }, speed, Phaser.Easing.Quadratic.In);
					onUpdate ? tween.onUpdateCallback(onUpdate, this) : 1+0;
					onComplete ? tween.onComplete.add(onComplete, this) : 1+0;
					tween.start();
				},
				spin: function(sprite) {
					var resetSpin = function() {
						sprite.rotation = 0;
					}
					this.fire(sprite, 'rotation', Math.PI*.5, 250, null, resetSpin)
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
						var colorTween = _PS.add.tween(colorBlend).to({step: 100}, 250);
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

			this.playSound = function(matrixPosition) {
				console.log(matrixPosition);
			};

			this.getNeighborIndexes = function(matrixIndex) {
				return [
					matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) - 1,
					matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y),
					matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) + 1,
					matrixIndex + (this.matrixPosition.y) - 1,
					matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) + 1,
					matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y),
					matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) - 1,
					matrixIndex + (this.matrixPosition.y) + 1
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
				this.doTween('tint', {color: 0xF9F9F9});
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
				});
			}

			this.sprite.inputEnabled = true;
			this.sprite.events.onInputOver.add(this.onHover, this);
			this.sprite.events.onInputDown.add(this.onDown, this);
		}

		this.gridMatrix = new this.GridMatrix();
		this.gridMatrix.init();

		WX_P.popResize(this);
	},
	update: function() {},
	resize: function() {
		WX_P.popResize(this);
	}
};

////////////////////////////////////////////////////////////////////
// Window load.
// Set up jQuery UI controls and init (init defined in wxstem_phaser)
////////////////////////////////////////////////////////////////////
$(window).load(function() {
	WX_P.init('interactive-container', 1140, 1100);
});