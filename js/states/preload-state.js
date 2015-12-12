"use strict";
    var PreloadState = {
	//load the game assets before the game starts
  preload: function() {
    this.load.spritesheet('purple-guy', 'images/purple/ss-tp.png', 30, 35, 13, 0, 1);
  },
  create: function() {
    this.state.start('HomeState');
  }
};