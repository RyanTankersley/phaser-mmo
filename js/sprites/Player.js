"use strict";
//Not real life...just for fun
var getSillyText = function() {
    var adj = ['silly', 'awesome', 'turpentime', 'rabid', 'cool', 'embarrassed',
    'exquisite', 'magnificent', 'obnoxious', 'chubby', 'delightful', 'melodic',
    'zealous'];
    var noun = ['badger', 'llama', 'mouse', 'squirrel', 'emu', 'wolf', 'wallaby',
    'kangaroo', 'lorakeet', 'liger', 'narwhal', 'unicorn', 'fox', 'tiger', 'lion',
    'bear'];
    
    var finalAdj = adj[Math.floor(Math.random() * adj.length)];
    var finalnoun = noun[Math.floor(Math.random() * noun.length)];
    return finalAdj + ' ' + finalnoun;
};
    
function Player(sprite, animator) {
    this.sprite = sprite;
    this.RUNNING_SPEED = 100; 
    var self = this;
    this.name = getSillyText();
    var prevLoc = {
        x: sprite.x,
        y: sprite.y   
    };
    
    var move = function(controls) {
        var x = controls.left ? -self.RUNNING_SPEED : controls.right ? self.RUNNING_SPEED : 0;
        var y = controls.up ? -self.RUNNING_SPEED : controls.down ? self.RUNNING_SPEED : 0;
        self.sprite.body.velocity.x = x;
        self.sprite.body.velocity.y = y;
        
        if(y > 0)
            animator.play(animator.down);
        else if(y < 0)
            animator.play(animator.up);
        else if(x > 0)
            animator.play(animator.right);
        else if(x < 0)
            animator.play(animator.left);
        else
            animator.stop();
    };
    
    this.update = function(cursors) {
        move(cursors);
        if(prevLoc.x != sprite.x || prevLoc.y != sprite.y) {
            prevLoc.x = sprite.x;
            prevLoc.y = sprite.y;
            socket.emit('send-location', this.name, prevLoc);
        }
    }
};

function PlayerFactory(game) {
    var getSprite = function(x, y, key) {
        var sprite = game.add.sprite(x, y, key);
        game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(.5);
        return sprite;
    };
    
    var getAnimationManager = function(sprite) {
        var stopped = sprite.animations.add('stop', [0]).name;
        var up = sprite.animations.add('up', [5, 7, 8, 6]).name;
        var down = sprite.animations.add('down', [1, 3, 4, 2]).name;
        var left = sprite.animations.add('left', [9, 11, 12, 11]).name;
        
        return new MoveableAnimator(sprite, 5, stopped, left, 'willplayleft', up, down, true);
    };
    
    this.createPlayer = function(x, y, key) {
        var sprite = getSprite(x, y, key);
        
        return new Player(sprite, getAnimationManager(sprite));
    };
    
    this.createNonPlayer = function(x, y, key, name) {
        var sprite = getSprite(x, y, key);
        return new NonPlayer(sprite, name, getAnimationManager(sprite));
    }
};