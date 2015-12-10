function Player(sprite) {
    "use strict";
    this.sprite = sprite;
    this.RUNNING_SPEED = 100; 
    
    this.update = function(cursors) {
        this.sprite.body.velocity.setTo(0);
        this.sprite.scale.setTo(1);
        
        if(!cursors.left.isDown && !cursors.right.isDown &&
           !cursors.up.isDown && !cursors.down.isDown) {
            this.sprite.animations.play('stop');
        }
        
        if(cursors.left.isDown) {
            this.sprite.body.velocity.x = -this.RUNNING_SPEED;
            if(!cursors.up.isDown && !cursors.down.isDown)
                this.sprite.animations.play('left', 5, true);
        }
        else if(cursors.right.isDown) {
            this.sprite.body.velocity.x = this.RUNNING_SPEED;
            if(!cursors.up.isDown && !cursors.down.isDown) {
                this.sprite.animations.play('left', 5, true);
                this.sprite.scale.setTo(-1, 1);
            }
        }

        if(cursors.up.isDown) {
            this.sprite.body.velocity.y = -this.RUNNING_SPEED;
            this.sprite.animations.play('up', 5, true);
        }
        else if(cursors.down.isDown) {
            this.sprite.body.velocity.y = this.RUNNING_SPEED;
            this.sprite.animations.play('down', 5, true);
        }
    }
}