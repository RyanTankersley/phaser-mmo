"use strict";
function NonPlayer(sprite, name, animator) {
    this.sprite = sprite;
    var self = this;
    this.name = name;
    var prevLoc = {
        x: sprite.x,
        y: sprite.y   
    };
    
    this.update = function(newLoc) {
        var isUp = newLoc.y < prevLoc.y;
        var isDown = newLoc.y > prevLoc.y;
        var isLeft = newLoc.x < prevLoc.x;
        var isRight = newLoc.x > prevLoc.x;
        
        // if(isLeft && !isUp && !isDown) {
        //     animator.play(animator.left);
        // } else if(isRight && !isUp && !isDown) {
        //     animator.play(animator.right);
        // } else if(isUp) {
        //     animator.play(animator.up);
        // } else if(isDown) {
        //     animator.play(animator.down);
        // }
        prevLoc = newLoc;
        sprite.x = newLoc.x;
        sprite.y = newLoc.y;
    }
    
    this.stop = function(loc) {
        prevLoc = loc;
        //animator.stop();
    }
}