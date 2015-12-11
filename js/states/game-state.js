"use strict";
var GameState = {
    init: function() {
        this.game.time.advancedTiming = true; //this.game.fps for fps
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    //executed after everything is loaded
    create: function() {    
        this.guy = new PlayerFactory(this.game).createPlayer(100, 100, 'purple-guy');
    },
    //executed multiple times per second
    update: function() {
        var c = this.cursors;
        var controls = new Controls(c.left.isDown, c.right.isDown, c.up.isDown, c.down.isDown);
        this.guy.update(controls);
    }
};