var PreloadState = {
	//load the game assets before the game starts
  preload: function() {

    this.load.spritesheet('purple-vert', 'assets/images/purple/up-tp.png', 29, 35, 7, 0, 1);    
    // this.load.image('apple', 'assets/images/apple.png');    
    // this.load.image('candy', 'assets/images/candy.png');    
    // this.load.image('rotate', 'assets/images/rotate.png');    
    // this.load.image('toy', 'assets/images/rubber_duck.png');    
    // this.load.image('arrow', 'assets/images/arrow.png');   
    // this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1); 
  },
  create: function() {
    this.state.start('HomeState');
  }
};