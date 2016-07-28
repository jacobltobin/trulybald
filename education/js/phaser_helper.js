/*
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

    WxStem and Phaser fusion
    Global methods and object library

*/

WX_P = {
    ////////////////////////////////////////////////////////////////////
    // PROPERTIES
    ////////////////////////////////////////////////////////////////////
    interactiveStates: {},
    tween: null,
    months: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
    monthsInverse: [ "July","August","September","October","November","December","January","February","March","April","May","June" ],
    timeofday: [ "7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM" ],
    updateGroup: [],
    waitForAJAX: false,

    ////////////////////////////////////////////////////////////////////
    // UTILITIES
    ////////////////////////////////////////////////////////////////////
    configure: function(state) {
        state.input.maxPointers = 1;
        state.stage.disableVisibilityChange = true;
        state.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        state.load.crossOrigin = false;
        state.game.load.onLoadStart.add(WX_P.loadStart, state);
        state.game.load.onFileComplete.add(WX_P.fileComplete, state);
        state.game.load.onLoadComplete.add(WX_P.loadComplete, state);
    },
    fadeLoader: function(state) {
        var loadbg = state.add.sprite(0, 0, 'back');
        loadbg.width = state.world.width;
        loadbg.height = state.world.height;
        state.add.tween(loadbg).to({ alpha: 0 }, 1500, Phaser.Easing.Quartic.Out, true);
        state.preloaded = true;
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        if (cacheKey == 'back') {
            this.loadingBar = this.add.sprite(0,0,cacheKey);
            this.loadingBar.width = 0;
            this.loadingBar.height = this.world.height;
            this.loadingText = this.add.text(
                50,
                170,
                'Boooooop 0%', {
                    font: "20px 'Arial'",
                    fill: "#ffffff",
                    align: "center"
                });
            this.loaderReady = true;
        }
        if (this.loaderReady == true) {
            this.loadingText.setText('Boooooop '+progress+'%');
            this.add.tween(this.loadingBar).to(
                { width: (progress/100)*this.world.width },
                1000,
                Phaser.Easing.Quartic.Out,
                true
            );
        }
    },
    loadStart: function() {},
    loadComplete: function() {
        var game = this;
        var start = function() {
            if (WX_P.waitForAJAX == false) {
                game.state.start('Level_main');
            }
            else return;
        }
        setTimeout(start, 1000);
    },
    popResize: function(state) {
        var gw = state.world.width;
        var ar = WX_P.baseh/WX_P.basew;
        var gh = gw * ar;
        $('#'+WX_P.interactiveContainer).height(gh);
        var cam = state.game.camera,
            cam_width = cam.view.width;
        cam.scale.x = (gw/WX_P.basew);
        cam.scale.y = (gh/WX_P.baseh);
    },
    init: function(container, basew, baseh) {
        WX_P.basew = basew;
        WX_P.baseh = baseh;
        WX_P.interactiveContainer = container;
        var wxSTEM_Interact = new Phaser.Game(
            "100%", // width
            "100%", // height
            Phaser.AUTO, //renderer
            WX_P.interactiveContainer, // render element
            false // transparent
        );
        $.each(WX_P.interactiveStates, function(key, value) {
            wxSTEM_Interact.state.add(key, value.prototype);
        });
        wxSTEM_Interact.state.start('Boot');
    },
    switchState: function(button) {
        k = 'Level_' + button.key.split('_')[1];
        this.state.start(k);
    },
    update: function() {
        for (i = 0; i < WX_P.updateGroup.length; i++) {
            WX_P.updateGroup[i].update();
        }
    },

    ////////////////////////////////////////////////////////////////////
    // OBJECT CLASSES
    ////////////////////////////////////////////////////////////////////

    BSModal: function(id, title, content, button) {
        html = '';
        button.attr('data-toggle','modal');
        button.attr('data-target','.'+id);
        html += '<!-- Course Map Modal -->';
        html += '<div class="modal fade '+id+'" tabindex="-1" role="dialog" aria-labelledby="wxstem phaser modal" aria-hidden="true">';
        html += '<div class="modal-dialog modal-lg">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>';
        html += '<h4 class="modal-title">'+title+'</h4>';
        html += '</div><div class="modal-body">'
        html += content;
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);
    },

    InfoWindow: function(state, description, hasButton) {

        /* from a create loop, pass in "this" for state 
        and whatever text you want in it as description */

        this.open = function(button) { // open me
            if ((state.tween !== null && state.tween.isRunning) || background.position.x === 1) {
                return;
            }
            state.tween = state.add.tween(background.position).to({
                x: 20,
                y: 100
            }, 1000, Phaser.Easing.Quartic.Out, true)
        };
        this.close = function(button) { // close me
            state.tween = state.add.tween(background.position).to({
                x: -1000,
                y: 100
            }, 500, Phaser.Easing.Sinusoidal.In, true);
        };
        this.update = function() { // update me
            this.text.x = this.background.x + 25;
            this.text.y = this.background.y + 25;
            this.closeBtn.x = background.x + background.width - 25;
            this.closeBtn.y = background.y - 10;
        };
        WX_P.updateGroup.push(this) // add me to the update group !

        var background = this.background = state.add.sprite(-1000, 100, 'info-window');
        background.alpha = 0.8;
        background.inputEnabled = true;
        background.input.enableDrag();

        this.closeBtn = state.add.button(0, 0, 'btn_close', this.close, state, 1, 0, 2, 1);
        this.closeBtn.input.useHandCursor = true;

        this.fontstyle = {
            font: "14px Arial",
            fill: "#333333",
            wordWrap: true,
            wordWrapWidth: background.width - 40,
            align: "left"
        };
        this.text = state.add.text(0, 0, description, this.fontstyle);

        background.height = this.text.height + 80;

        this.group = state.add.group();
        this.group.add(this.background);
        this.group.add(this.closeBtn);
        this.group.add(this.text);

        if (hasButton) {
            this.infobutton = state.add.button(27, 27, 'btn_info', this.open, state, 1, 0, 2, 1).input.useHandCursor = true;
        }

    },

    // a slide control, can go top or bottom
    Slider: function(state, position) {
        var coords = {
            bottom: {x: 30,y: 550},
            top: {x: 100,y: 50}
        }
        var sliderTextStyle = {
            font: "16px Arial",
            fill: "#ffffff",
            align: "center"
        };
        this.update = function() { // update me
            this.sliderText.x = this.sliderControl.x - (this.sliderText.width / 2) + 10;
            this.p = Math.round(1000*(this.sliderControl.x+this.sliderControl.width-this.sliderBounds.x)/this.sliderBounds.width)/1000;
            this.timeofday = WX_P.timeofday[parseInt(this.p*12.5)];
            this.sliderText.setText(this.timeofday);
        };
        WX_P.updateGroup.push(this); // add me to the update group

        this.x = coords[position].x;
        this.y = coords[position].y;

        this.sliderTrack = state.add.sprite(this.x, this.y, 'slider-track');

        // invisible rectangle binding sliderControl
        this.sliderBounds = new Phaser.Rectangle(
            this.x+5,
            this.y-10,
            this.sliderTrack.width-12,
            this.y + this.sliderTrack.height
        );

        this.sliderControl = state.add.sprite(this.x+5, this.y-9, 'slider-tab');
        this.sliderControl.inputEnabled = true;
        this.sliderControl.input.enableDrag();
        this.sliderControl.input.allowVerticalDrag = false;
        this.sliderControl.input.boundsRect = this.sliderBounds;
        this.sliderControl.input.useHandCursor = true;
        this.sliderText = state.add.text(this.sliderControl.x, this.sliderControl.y - 20, WX_P.timeofday[0], sliderTextStyle);

        // object phaser group
        this.group = state.add.group();
        this.group.add(this.sliderTrack);
        this.group.add(this.sliderControl);
        this.group.add(this.sliderText);
    }
};