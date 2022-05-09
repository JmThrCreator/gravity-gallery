class Box {
    constructor(x, y, w, h) {
        let options = {
            chamfer: { radius:10 },
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
        World.add(world, this.body);
    }
}