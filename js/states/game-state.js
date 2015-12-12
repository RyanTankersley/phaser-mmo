"use strict";
var GameState = {
    init: function() {
        this.game.time.advancedTiming = true; //this.game.fps for fps
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.disableVisibilityChange = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    //executed after everything is loaded
    create: function() {   
        this.users = [];
        var self = this;
        this.factory = new PlayerFactory(this.game);
        this.guy = this.factory.createPlayer(100, 100, 'purple-guy');
        
        socket.on('location-update', function(data) {
            var user = _.where(self.users, {'name': data.id});
            if(!user.length) {
                user = self.factory.createNonPlayer(data.location.x, data.location.y, 'purple-guy', data.id);
                user.actualLocation = data.location
                self.users.push(user);
            }
            else {
                user[0].actualLocation = data.location;
            }
        });
    },
    //executed multiple times per second
    update: function() {
        var c = this.cursors;
        var controls = new Controls(c.left.isDown, c.right.isDown, c.up.isDown, c.down.isDown);
        this.guy.update(controls);
        for(var user in this.users) {
            this.users[user].update();
        }
    }
};