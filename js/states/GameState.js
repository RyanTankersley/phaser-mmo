//this game will have only 1 state
var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    //executed after everything is loaded
    create: function() {   
        this.RUNNING_SPEED = 100;  
        this.guy = this.game.add.sprite(100, 100, 'purple-guy');
        this.game.physics.arcade.enable(this.guy);
        this.guy.anchor.setTo(.5);
        
        this.guy.animations.add('stop', [0]);
        this.guy.animations.add('up', [5, 7, 8, 6]);
        this.guy.animations.add('down', [1, 3, 4, 2]);
        this.guy.animations.add('left', [9, 11, 12, 11]);
        this.guy.animations.add('right', [5, 7, 8, 6]);
    },
    //executed multiple times per second
    update: function() {
        this.guy.body.velocity.setTo(0);
        this.guy.scale.setTo(1);
        
        if(!this.cursors.left.isDown && !this.cursors.right.isDown &&
           !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.guy.animations.play('stop');
        }
        if(this.cursors.left.isDown) {
            this.guy.body.velocity.x = -this.RUNNING_SPEED;
            if(!this.cursors.up.isDown && !this.cursors.down.isDown)
                this.guy.animations.play('left', 5, true);
        }
        else if(this.cursors.right.isDown) {
            this.guy.body.velocity.x = this.RUNNING_SPEED;
            if(!this.cursors.up.isDown && !this.cursors.down.isDown) {
                this.guy.animations.play('left', 5, true);
                this.guy.scale.setTo(-1, 1);
            }
        }

        if(this.cursors.up.isDown) {
            this.guy.body.velocity.y = -this.RUNNING_SPEED;
            this.guy.animations.play('up', 5, true);
        }
        else if(this.cursors.down.isDown) {
            this.guy.body.velocity.y = this.RUNNING_SPEED;
            this.guy.animations.play('down', 5, true);
        }
    }
};