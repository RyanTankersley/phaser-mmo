"use strict";
function NonPlayer(sprite, name, animator) {
    this.sprite = sprite;
    var self = this;
    this.name = name;
    this.actualLocation;
    
    var fuzzyCheck = function(num1, num2, fuzz) {
        return Math.abs(num1 - num2) >= fuzz;    
    };
    
    var speed = 100;
    this.update = function() {
        var prevLoc = {x: self.sprite.x, y: self.sprite.y};
        
        var fuzzY = fuzzyCheck(self.actualLocation.y, prevLoc.y, 3);
        var fuzzX = fuzzyCheck(self.actualLocation.x, prevLoc.x, 3);
        var isUp = self.actualLocation.y < prevLoc.y && fuzzY;
        var isDown = self.actualLocation.y > prevLoc.y && fuzzY;
        var isLeft = self.actualLocation.x < prevLoc.x && fuzzX;
        var isRight = self.actualLocation.x > prevLoc.x && fuzzX;
        var x = isLeft ? -speed : isRight ? speed : 0;
        var y = isUp ? -speed : isDown ? speed : 0;
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
}