class Gallery {
    constructor(x, y, nx, ny, w, h, bw, bh) {

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.numberX = nx;
        this.numberY = ny;
        this.boxWidth = bw;
        this.boxHeight = bh;



        let stack = Composites.stack(x, y, nx, ny, w, h, function(x, y) {
            let options = {
                chamfer: { radius:10 },
                render: {
                    sprite: {
                        texture: './static/upload/box.png',
                        xScale: 0.5,
                        yScale: 0.5
                    }
                }
            }

            return Bodies.rectangle(x, y, bw, bh, options);
        });

        World.add(world, stack);
    }
}