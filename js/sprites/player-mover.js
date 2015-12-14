"use strict";
function PlayerMover(sprite, animator) {
    this.move = function(controls, speed) {
        var x = controls.left ? -speed : controls.right ? speed : 0;
        var y = controls.up ? -speed : controls.down ? speed : 0;
        sprite.body.velocity.x = x;
        sprite.body.velocity.y = y;
        
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
};