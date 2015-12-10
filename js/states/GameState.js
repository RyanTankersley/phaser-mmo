"use strict";
var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    //executed after everything is loaded
    create: function() {    
        this.guy = new Player(this.game.add.sprite(100, 100, 'purple-guy'));
        this.game.physics.arcade.enable(this.guy.sprite);
        this.guy.sprite.anchor.setTo(.5);
        
        this.guy.sprite.animations.add('stop', [0]);
        this.guy.sprite.animations.add('up', [5, 7, 8, 6]);
        this.guy.sprite.animations.add('down', [1, 3, 4, 2]);
        this.guy.sprite.animations.add('left', [9, 11, 12, 11]);
        this.guy.sprite.animations.add('right', [5, 7, 8, 6]);
    },
    //executed multiple times per second
    update: function() {
        var c = this.cursors;
        var controls = new Controls(c.left.isDown, c.right.isDown, c.up.isDown, c.down.isDown);
        this.guy.update(controls);
    }
};