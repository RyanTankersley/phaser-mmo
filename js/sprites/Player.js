"use strict";
function Player(sprite, animator) {
    this.sprite = sprite;
    this.RUNNING_SPEED = 100; 
    var self = this;
    
    var move = function(controls) {
        var anim;
        if(controls.any) {
            if(controls.horizontal) {
                if(controls.left) {
                    anim = animator.left;
                    self.sprite.body.velocity.x = -self.RUNNING_SPEED;
                } else {
                    anim = animator.right;
                    self.sprite.body.velocity.x = self.RUNNING_SPEED;
                }
            } else {
                self.sprite.body.velocity.x = 0;
            }
            
            if(controls.vertical) {
                if(controls.up) {
                    self.sprite.body.velocity.y = -self.RUNNING_SPEED;
                    anim = animator.up;
                } else {
                    self.sprite.body.velocity.y = self.RUNNING_SPEED;
                    anim = animator.down;
                }
            } else {
                self.sprite.body.velocity.y = 0;
            }
            
            animator.play(anim);
        } else {
            animator.stop();
            self.sprite.body.velocity.setTo(0);
        }
    };
    
    this.update = function(cursors) {
        move(cursors);
    }
};

function PlayerFactory(game) {
    this.createPlayer = function(x, y, key) {
        var playerSprite = game.add.sprite(x, y, key);
        game.physics.arcade.enable(playerSprite);
        console.log(playerSprite);
        playerSprite.anchor.setTo(.5);
        
        var stopped = playerSprite.animations.add('stop', [0]).name;
        var up = playerSprite.animations.add('up', [5, 7, 8, 6]).name;
        var down = playerSprite.animations.add('down', [1, 3, 4, 2]).name;
        var left = playerSprite.animations.add('left', [9, 11, 12, 11]).name;
        
        var animationManager = new MoveableAnimator(playerSprite, 5, stopped, left, 'willplayleft', up, down, true);
        return new Player(playerSprite, animationManager);
    }  
};