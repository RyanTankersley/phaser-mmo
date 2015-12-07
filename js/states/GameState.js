//this game will have only 1 state
var GameState = {

    //executed after everything is loaded
    create: function() {     
        this.guy = this.game.add.sprite(100, 100, 'guy');
        this.guy.anchor.setTo(.5);
        
        this.guy.animations.add('up', [])
    },
    //executed multiple times per second
    update: function() {
    }
};