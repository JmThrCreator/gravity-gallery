class Gallery {
    constructor(x, y, nx, ny, w, h, bw, bh) {
        var textureList = paintingList;
        
        let stack = Composites.stack(x, y, nx, ny, w, h, function(x, y, ix, iy) {
            if (iy == 1){
                ix += 3;
            }
            if (iy == 2){
                ix += 6;
            }
            let options = {
                //chamfer: { radius:10 },
                render: {
                    sprite: {
                        texture: textureList[ix].path,
                        xScale: 0.5,
                        yScale: 0.5,
                    }
                }
            }
            return Bodies.rectangle(x, y, textureList[ix].width/2, textureList[ix].height/2, options);
        });

        World.add(world, stack);
    }
}