"use strict";
function MoveableAnimator(sprite, loopSpeed, stopped, left, right, up, down, isRightReversed) {
    this.sprite = sprite;
    this.loopSpeed = loopSpeed;
    this.stopped = stopped;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    
    this.play = function(anim) {
        if(isRightReversed) {
            if((anim == this.right && sprite.scale.x >= 0) || 
              ((anim == this.left || anim == this.up || anim == this.down) && sprite.scale.x < 0)) {
                sprite.scale.x *= -1;
            }
            
            if(anim == this.right) {
                anim = this.left;
            }
        }
        
        sprite.animations.play(anim, this.loopSpeed, true);
    };
    
    this.stop = function() {
        sprite.animations.stop();
        sprite.animations.play(this.stopped);
    };
};