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

		this.sounds = [];
        this.addSound = function(item, index, list) {
            var sound = _PS.add.sound(item.url.split('sounds/')[1].split('.')[0], 1, false);
            _PS.sounds.push(sound);
        }
        _.each(this.cache._cache.sound, this.addSound);

		this.GridMatrix = function(x, y) {
			var self = this;
			this.local = {
				x: x,
				y: y
			}
			this.dimensions = {
				x: 6,
				y: 5
			}
			this.tileDimensions = {
				x: 20,
				y: 40,
				z: 20
			}
			this.buildTileTexture = function() {
				var tileGraphic = _PS.add.graphics(-9990, -9990);
				tileGraphic.beginFill(0xffffff)
				tileGraphic.lineStyle(1, 0x000000, 1);
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
				self.buildTileTexture();
				self.buildTiles();
				self.animIndex = 0;
				setInterval(function() {
					var random = Math.abs(Math.round(Math.random()*_PS.sounds.length-1));
					self.tiles[self.animIndex].doTween('spin');
					_PS.sounds[random].play('', 0, 1, false, false);
					++self.animIndex;
					if (self.animIndex >= self.tiles.length) {
						self.animIndex = 0;
					}
				}, 100);
			}
		}

		this.GridTile = function(x, y, z, matrixPosition, texture) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.matrixPosition = matrixPosition;
			this.sprite = _PS.add.sprite(x, y, texture);
			this.sprite.anchor.set(.5, .5);
			this.sprite.tint = 0xff0000;

			this.actions = {
				spin: {
					tweenAction: { rotation : Math.PI*10 },
					tweenReset: function(sprite) {
						sprite.rotation = 0;
					}
				}
			}

			this.doTween = function(context) {
				this.tween = null;
				if (this.sprite.tween) {
					_PS.remove.tween(this.sprite.tween);
				}
				this.actions[context].tweenReset(this.sprite);
				var tweenAction = this.actions[context].tweenAction;
				this.tween = _PS.add.tween(this.sprite);
				this.tween.to({ rotation : Math.PI*2 }, 2000, Phaser.Easing.Quadratic.In);
				this.tween.start();
			}

			this.onHover = function(sprite, pointer) {
				this.doTween('spin');
				this.sprite.tint = Math.random() * 0xffffff;
			}
			this.onDown = function(sprite, pointer) {
				var matrixIndex = _PS.gridMatrix.matrixPositionToIndex(this.matrixPosition);
				_PS.gridMatrix.tiles[matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) - 1].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y)].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex - _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) + 1].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex + (this.matrixPosition.y) - 1].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) + 1].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y)].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex + _PS.gridMatrix.dimensions.x + (this.matrixPosition.y) - 1].doTween('spin');
				_PS.gridMatrix.tiles[matrixIndex + (this.matrixPosition.y) + 1].doTween('spin');
			}

			this.sprite.inputEnabled = true;
		}

		var gridMatrices = [];
		for (var i = 0, j = 6; i < j; i++) {
			for (var k = 0, l = 4; k < l; k++) {
				var g = new this.GridMatrix(160*i+80, 220*k+80);
				gridMatrices.push(g);
				g.init();
			}
		}

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