function Controls(isLeft, isRight, isUp, isDown) {
    this.left = isLeft;
    this.right = isRight;
    this.up = isUp;
    this.down = isDown;
    this.horizontal = isLeft || isRight;
    this.vertical = isUp || isDown;
    this.any = isUp || isDown || isLeft || isRight;
}