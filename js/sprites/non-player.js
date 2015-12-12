"use strict";
function NonPlayer(sprite, name, animator) {
    this.sprite = sprite;
    var self = this;
    this.name = name;
    var prevLoc = {
        x: sprite.x,
        y: sprite.y   
    };
    
    var fuzzyCheck = function(num1, num2, fuzz) {
        return Math.abs(num1, num2) <= fuzz;    
    };
    
    var speed = 100;
    // this.update = function(newLoc) {
    //     var fuzzY = fuzzyCheck(newLoc.y, prevLoc.y, 2);
    //     var fuzzX = fuzzyCheck(newLoc.x, prevLoc.x);
    //     var isUp = newLoc.y < prevLoc.y && fuzzY;
    //     var isDown = newLoc.y > prevLoc.y && fuzzY;
    //     var isLeft = newLoc.x < prevLoc.x && fuzzX;
    //     var isRight = newLoc.x > prevLoc.x && fuzzX;
    //     
    //     self.sprite.body.velocity.x = isLeft ? -speed : isRight ? speed : 0;
    //     self.sprite.body.velocity.y = isUp ? -speed : isDown ? speed : 0;
    //     // if(isLeft && !isUp && !isDown) {
    //     //     animator.play(animator.left);
    //     // } else if(isRight && !isUp && !isDown) {
    //     //     animator.play(animator.right);
    //     // } else if(isUp) {
    //     //     animator.play(animator.up);
    //     // } else if(isDown) {
    //     //     animator.play(animator.down);
    //     // }
    //     prevLoc = newLoc;
    // }
    
    this.update = function() {
        self.sprite.body.velocity.x = Math.floor(Math.random() * 100);
        self.sprite.body.velocity.y = Math.floor(Math.random() * 100);
    };
    this.stop = function(loc) {
        prevLoc = loc;
        animator.stop();
    }
}