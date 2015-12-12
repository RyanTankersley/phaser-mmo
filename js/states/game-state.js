"use strict";
var GameState = {
    init: function() {
        this.game.time.advancedTiming = true; //this.game.fps for fps
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    //executed after everything is loaded
    create: function() {   
        this.users = [];
        var self = this;
        this.factory = new PlayerFactory(this.game);
        this.guy = this.factory.createPlayer(100, 100, 'purple-guy');
        
        socket.on('location-update', function(data) {
            var user = null;
            for(var i = 0; i < self.users.length; i++) {
                if(self.users.name == data.id) {
                    user = self.users[i];
                    i = self.users.length;
                }
            };
            
            if(user == null) {
                user = self.factory.createNonPlayer(data.location.x, data.location.y, 'purple-guy', data.id);
                self.users.push(user);
            }
            user.update(data.location);
            console.log(data);
        });
    },
    //executed multiple times per second
    update: function() {
        var c = this.cursors;
        var controls = new Controls(c.left.isDown, c.right.isDown, c.up.isDown, c.down.isDown);
        this.guy.update(controls);
    }
};