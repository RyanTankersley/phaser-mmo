"use strict";
function NonPlayer(sprite, name, mover) {
    this.sprite = sprite;
    var self = this;
    this.name = name;
    this.actualLocation;
    this.RUNNING_SPEED = 100;
    
    var fuzzyCheck = function(num1, num2, fuzz) {
        return Math.abs(num1 - num2) >= fuzz;    
    };
    
    this.update = function() {
        var prevLoc = {x: self.sprite.x, y: self.sprite.y};
        
        var fuzzX = fuzzyCheck(self.actualLocation.x, prevLoc.x, 3);
        var isLeft = self.actualLocation.x < prevLoc.x && fuzzX;
        var isRight = self.actualLocation.x > prevLoc.x && fuzzX;
        
        var fuzzY = fuzzyCheck(self.actualLocation.y, prevLoc.y, 3);
        var isUp = self.actualLocation.y < prevLoc.y && fuzzY;
        var isDown = self.actualLocation.y > prevLoc.y && fuzzY;
        
        var controls = new Controls(isLeft, isRight, isUp, isDown);
        mover.move(controls, this.RUNNING_SPEED);
    };
}