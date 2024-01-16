import { Bodies, World } from 'matter-js'

const BOX_WIDTH = 300;
const HEIGHT_MARGIN = 20;
const DESKTOP_MIN_WIDTH = 960;

const GALLERY_X: { [key: number]: number } = {
  1: -470,
  2: -150,
  3: 170
}

export async function createGallery(world: World, width: number, images: Array<string>): Promise<number> {
  if (width < DESKTOP_MIN_WIDTH) { // mobile
    let maxHeight = 0;
    for (let i = 0; i < images.length; i++) {
      maxHeight += await createBox(width / 2 - 150, maxHeight + 20, images[i], world);
    }
    return maxHeight
  }
  // desktop
  var column_heights: { [key: number]: number } = {1: 0, 2: 0, 3: 0};

  for (let i = 0; i < images.length; i++) {
    let divisor: number = (i % 3) + 1;
    column_heights[divisor] += await createBox(width / 2 + GALLERY_X[divisor], column_heights[divisor] + 20, images[i], world);
  }
  return Math.max(...Object.values(column_heights)); // max height
}

export function createBoundaires(world: World, maxHeight:number) {
    let width = window.innerWidth
    createBoundary(-50, maxHeight/2, 100, maxHeight+500, world); // left
    createBoundary(width+50, maxHeight/2, 100, maxHeight+500, world); // right
    createBoundary(width/2, maxHeight+75, width, 100, world); // bottom
    createBoundary(width/2, -50, width, 100, world); // top
}

function createBoundary(x:number, y:number, w:number, h:number, world:World) {
    let options = {
        isStatic: true,
        collisionFilter: {'category': 2},
        render: {visible: false},
    };
    let body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, body);
}

function createBox(x: number, y: number, image_name: string, world:World): Promise<number> {
    return new Promise((resolve) => {
        let image = new Image();
        image.src = '/' + image_name;
    
        image.onload = function () {
          let ratio = image.height / image.width;
    
          let boxWidth = BOX_WIDTH;
          let boxHeight = ratio * BOX_WIDTH;
    
          let options = {
            render: {
              sprite: {
                texture: image.src,
                xScale: boxWidth / image.width,
                yScale: boxHeight / image.height,
              },
            },
          };
          let body = Bodies.rectangle(x + boxWidth / 2, y + boxHeight / 2, boxWidth, boxHeight, options);
          World.add(world, body);
    
          resolve(boxHeight+HEIGHT_MARGIN);
        };
    });
}