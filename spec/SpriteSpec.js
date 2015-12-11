"use strict";
describe('Sprites', function() {
    describe('Player', function() {
        var player;
        var sprite;
        var animator;
        var controls;
        beforeEach(function() {
            sprite = {
                body: {
                    velocity: {
                        x: 0,
                        y: 0,
                        setTo: function(x) {}
                    }
                }  
            };
            spyOn(sprite.body.velocity, 'setTo');
            animator = {
                up: 'up',
                right: 'right',
                left: 'left',
                down: 'down',
                play: function(x) {},
                stop: function() {}
            };
            spyOn(animator, 'play');
            spyOn(animator, 'stop');
            controls = {
                any: false,
                horizontal: false,
                vertical: false,
                up: false,
                left: false,
                right: false,
                down: false
            };
            player = new Player(sprite, animator);
        });
        
        it('should move left', function() {
            sprite.body.velocity.y = 100;
            controls.left = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.left);
            expect(sprite.body.velocity.x).toEqual(-player.RUNNING_SPEED);
            expect(sprite.body.velocity.y).toEqual(0);
        });
        
        it('should move right', function() {
            sprite.body.velocity.y = 100;
            controls.right = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.right);
            expect(sprite.body.velocity.x).toEqual(player.RUNNING_SPEED);
            expect(sprite.body.velocity.y).toEqual(0);
        });
        
        it('should move up', function() {
            sprite.body.velocity.x = 100;
            controls.up = true;
            controls.vertical = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.up);
            expect(sprite.body.velocity.y).toEqual(-player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(0);
        });
        
        it('should move down', function() {
            sprite.body.velocity.x = 100;
            controls.down = true;
            controls.vertical = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.down);
            expect(sprite.body.velocity.y).toEqual(player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(0);
        });
        
        it('should move up-right', function() {
            controls.up = true;
            controls.right = true;
            controls.vertical = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.up);
            expect(sprite.body.velocity.y).toEqual(-player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(player.RUNNING_SPEED);
        });
        
        it('should move up-left', function() {
            controls.up = true;
            controls.left = true;
            controls.vertical = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.up);
            expect(sprite.body.velocity.y).toEqual(-player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(-player.RUNNING_SPEED);
        });
        
        it('should move down-right', function() {
            controls.down = true;
            controls.right = true;
            controls.vertical = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.down);
            expect(sprite.body.velocity.y).toEqual(player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(player.RUNNING_SPEED);
        });
        
        it('should move down-left', function() {
            controls.down = true;
            controls.left = true;
            controls.vertical = true;
            controls.horizontal = true;
            controls.any = true;
            player.update(controls);
            expect(animator.play).toHaveBeenCalledWith(animator.down);
            expect(sprite.body.velocity.y).toEqual(player.RUNNING_SPEED);
            expect(sprite.body.velocity.x).toEqual(-player.RUNNING_SPEED);
        });
        
        it('should stop', function() {
            player.update(controls);
            expect(animator.stop).toHaveBeenCalled;
            expect(sprite.body.velocity.setTo).toHaveBeenCalledWith(0);
        });
    });
    
    describe('Player Factory', function() {
            it('should create player', function() {
            var player = {
                animations: {
                    add: function(key, array) {
                        return {name: key};
                    }
                },
                anchor: {
                    setTo: function(val) {}
                }
            };
            var game = {
                add: {
                    sprite: function(x, y, key) {
                        return player;   
                    }
                },
                physics: {
                    arcade: {
                        enable: function(sprite) {}
                    }
                }
            };
            spyOn(game.add, 'sprite').and.callThrough();
            spyOn(game.physics.arcade, 'enable');
            spyOn(player.animations, 'add').and.callThrough();
            spyOn(player.anchor, 'setTo');
            
            var factory = new PlayerFactory(game);
            var p = factory.createPlayer(1, 2, 'player');
            expect(game.add.sprite).toHaveBeenCalledWith(1, 2, 'player');
            expect(game.physics.arcade.enable).toHaveBeenCalledWith(player);
            expect(player.anchor.setTo).toHaveBeenCalledWith(.5);
            expect(player.animations.add).toHaveBeenCalledWith('stop', [0]);
            expect(player.animations.add).toHaveBeenCalledWith('up', [5, 7, 8, 6]);
            expect(player.animations.add).toHaveBeenCalledWith('down', [1, 3, 4, 2]);
            expect(player.animations.add).toHaveBeenCalledWith('left', [9, 11, 12, 11]);
            expect(p.sprite).toEqual(player);
        });    
    });
    
    describe('Moveable Animator', function() {
        var sprite;
        var loopSpeed;
        var a;
        beforeEach(function() {
            sprite = {
                animations: {
                    play: function(anim, speed, loop) {
                    },
                    stop: function() {}
                },
                scale: {
                    x: 2
                }
            };
            loopSpeed = 2;
            a = new MoveableAnimator(sprite, loopSpeed, 'stop', 'left', 'right', 'up', 'down', false);
        });
        
        it('should create successfully', function() {
            expect(a.sprite).toEqual(sprite);
            expect(a.loopSpeed).toEqual(loopSpeed);
            expect(a.stopped).toEqual('stop');
            expect(a.left).toEqual('left');
            expect(a.right).toEqual('right');
            expect(a.up).toEqual('up');
            expect(a.down).toEqual('down');
        });
        
        it('should play left', function() {
            spyOn(sprite.animations, 'play');
            a.play(a.left);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.left, loopSpeed, true);
        });
        
        it('should play right', function() {
            spyOn(sprite.animations, 'play');
            a.play(a.right);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.right, loopSpeed, true);
        });
        
        it('should not reverse right when isRightReversed is false', function() {
            spyOn(sprite.animations, 'play');
            a.play(a.right);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.right, loopSpeed, true);
            expect(sprite.scale.x).toEqual(2);
        });
        
        it('should reverse right when isRightReversed is true', function() {
            a = new MoveableAnimator(sprite, loopSpeed, 'stop', 'left', 'reversed', 'up', 'down', true);
            spyOn(sprite.animations, 'play');
            a.play(a.right);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.left, loopSpeed, true);
            expect(sprite.scale.x).toEqual(-2);
        });
        
        it('should not reverse right when isRightReversed is true if already reversed', function() {
            sprite.scale.x = -2;
            a = new MoveableAnimator(sprite, loopSpeed, 'stop', 'left', 'reversed', 'up', 'down', true);
            spyOn(sprite.animations, 'play');
            a.play(a.right);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.left, loopSpeed, true);
            expect(sprite.scale.x).toEqual(-2);
        });
        
        it('should reverse left when isRightReversed is true and has been reversed', function() {
            sprite.scale.x = -2;
            a = new MoveableAnimator(sprite, loopSpeed, 'stop', 'left', 'reversed', 'up', 'down', true);
            spyOn(sprite.animations, 'play');
            a.play(a.left);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.left, loopSpeed, true);
            expect(sprite.scale.x).toEqual(2);
        });
        
        it('should not reverse left when isRightReversed is true if not already reversed', function() {
            a = new MoveableAnimator(sprite, loopSpeed, 'stop', 'left', 'reversed', 'up', 'down', true);
            spyOn(sprite.animations, 'play');
            a.play(a.left);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.left, loopSpeed, true);
            expect(sprite.scale.x).toEqual(2);
        });
        
        it('should play up', function() {
            spyOn(sprite.animations, 'play');
            a.play(a.up);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.up, loopSpeed, true);
        });
        
        it('should play down', function() {
            spyOn(sprite.animations, 'play');
            a.play(a.down);
            expect(sprite.animations.play).toHaveBeenCalledWith(a.down, loopSpeed, true);
        });
        
        it('should stop', function() {
            spyOn(sprite.animations, 'stop');
            spyOn(sprite.animations, 'play');
            a.stop();
            expect(sprite.animations.stop).toHaveBeenCalled;
            expect(sprite.animations.play).toHaveBeenCalledWith(a.stopped);
        });
    });
    
    describe('Controls', function() {
        it('should create successfully', function() {
            var c = new Controls(true, true, true, true);
            expect(c.left).toBeTruthy(); 
            expect(c.right).toBeTruthy(); 
            expect(c.up).toBeTruthy(); 
            expect(c.down).toBeTruthy(); 
            expect(c.horizontal).toBeTruthy(); 
            expect(c.vertical).toBeTruthy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know horizontal and any with left only', function() {
            var c = new Controls(true, false, false, false);
            expect(c.left).toBeTruthy(); 
            expect(c.right).toBeFalsy(); 
            expect(c.up).toBeFalsy(); 
            expect(c.down).toBeFalsy(); 
            expect(c.horizontal).toBeTruthy(); 
            expect(c.vertical).toBeFalsy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know horizontal and any with right only', function() {
            var c = new Controls(false, true, false, false);
            expect(c.left).toBeFalsy(); 
            expect(c.right).toBeTruthy(); 
            expect(c.up).toBeFalsy(); 
            expect(c.down).toBeFalsy(); 
            expect(c.horizontal).toBeTruthy(); 
            expect(c.vertical).toBeFalsy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know vertical and any with up only', function() {
            var c = new Controls(false, false, true, false);
            expect(c.left).toBeFalsy(); 
            expect(c.right).toBeFalsy(); 
            expect(c.up).toBeTruthy(); 
            expect(c.down).toBeFalsy(); 
            expect(c.horizontal).toBeFalsy(); 
            expect(c.vertical).toBeTruthy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know vertical and any with down only', function() {
            var c = new Controls(false, false, false, true);
            expect(c.left).toBeFalsy(); 
            expect(c.right).toBeFalsy(); 
            expect(c.up).toBeFalsy(); 
            expect(c.down).toBeTruthy(); 
            expect(c.horizontal).toBeFalsy(); 
            expect(c.vertical).toBeTruthy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know both vertical and horizontal can be true', function() {
            var c = new Controls(true, false, false, true);
            expect(c.left).toBeTruthy(); 
            expect(c.right).toBeFalsy(); 
            expect(c.up).toBeFalsy(); 
            expect(c.down).toBeTruthy(); 
            expect(c.horizontal).toBeTruthy(); 
            expect(c.vertical).toBeTruthy(); 
            expect(c.any).toBeTruthy(); 
        });
        
        it('should know none are true', function() {
            var c = new Controls(false, false, false, false);
            expect(c.left).toBeFalsy(); 
            expect(c.right).toBeFalsy(); 
            expect(c.up).toBeFalsy(); 
            expect(c.down).toBeFalsy(); 
            expect(c.horizontal).toBeFalsy(); 
            expect(c.vertical).toBeFalsy(); 
            expect(c.any).toBeFalsy(); 
        });
    });
});