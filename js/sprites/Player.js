function Player(sprite) {
    "use strict";
    this.sprite = sprite;
    this.RUNNING_SPEED = 100; 
    var self = this;
    
    var move = function(controls) {
        if(controls.any) {
            if(controls.horizontal) {
                var scale;
                if(controls.left) {
                    self.sprite.body.velocity.x = -self.RUNNING_SPEED;
                    scale = 1;
                } else {
                    self.sprite.body.velocity.x = self.RUNNING_SPEED;
                    scale = -1;
                }
                
                if(!controls.vertical) {
                    self.sprite.animations.play('left', 5, true);
                    self.sprite.scale.setTo(scale, 1);
                }
            } else {
                self.sprite.body.velocity.x = 0;
            }
            
            if(controls.vertical) {
                var anim;
                if(controls.up) {
                    self.sprite.body.velocity.y = -self.RUNNING_SPEED;
                    anim = 'up';
                } else {
                    self.sprite.body.velocity.y = self.RUNNING_SPEED;
                    anim = 'down';
                }
                
                self.sprite.animations.play(anim, 5, true);
                self.sprite.scale.setTo(1);
            } else {
                self.sprite.body.velocity.y = 0;
            }
        } else {
            self.sprite.animations.play('stop');
            self.sprite.body.velocity.setTo(0);
        }
    };
    
    this.update = function(cursors) {
        move(cursors);
    }
}