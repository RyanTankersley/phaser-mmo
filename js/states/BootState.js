var BootState = {
    //initiate some game-level settings
    init: function() {
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    create: function() {
        this.state.start('PreloadState');
    }
};