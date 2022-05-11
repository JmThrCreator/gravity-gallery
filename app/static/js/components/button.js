class Circle {
    constructor(img, img, x, y, r, w, h) {
      let options = {
        friction: 0.3,
        restitution: 0.6
      };
      this.body = Bodies.circle(x, y, r, options);
      World.add(world, this.body);
    }
  }