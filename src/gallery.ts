import { Events, Engine, World, Composite, Query, MouseConstraint, Mouse, Render, Runner } from 'matter-js'
import { createBoundaires, createGallery } from './bodies.ts'

const imageFiles = import.meta.glob('/public/**/*.{png,PNG,jpg,jpeg}');
const IMAGES: Array<string> = Object.keys(imageFiles).map(path => path.split('/')[2]);
const GRAVITY = 0;

var width = window.innerWidth,
  height = window.innerHeight;

// Engine
var engine = Engine.create(),
  world = engine.world;

engine.gravity.y = GRAVITY;

// Render
var render = Render.create({
  element: document.body,
  engine: engine,
  options:
  {
    wireframes: false,
    background: 'transparent',
    wireframeBackground: 'transparent'
  }
});

render.canvas.width = window.innerWidth
render.canvas.height = height
render.options.pixelRatio = 1;
Render.run(render);

// Runner
var runner = Runner.create();
Runner.run(runner, engine);

const maxHeight = await createGallery(world, width, IMAGES)
createBoundaires(world, maxHeight)
render.canvas.height = maxHeight + 25;


// Mouse
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false
    }
  }
});

mouseConstraint.mouse.element.removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);


render.mouse = mouse;
World.add(world, mouseConstraint);


// Sort z-index by category
Events.on(engine.world, "afterAdd", function () {
  engine.world.bodies.sort((a: Matter.Body, b: Matter.Body) => {
    const categoryA = a.collisionFilter?.category ?? 0;
    const categoryB = b.collisionFilter?.category ?? 0;

    return categoryB - categoryA;
  });
});

function updatePointer() {
  let bodies = Composite.allBodies(engine.world);
  let physicsBodies = Query.point(bodies, mouse.position);
  let cursor = "default";

  for (let i = 0; i < physicsBodies.length; i++) {
    if (physicsBodies[i].isStatic) continue;
    cursor = "pointer";
    break;
  }
  document.body.style.cursor = cursor;
  requestAnimationFrame(updatePointer);
}
updatePointer();

// Resize window

window.addEventListener('resize', function () {
  width = window.innerWidth;
  height = window.innerHeight;

  render.canvas.width = width;

  let bodies = Composite.allBodies(engine.world);

  // replace borders
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].isStatic) {
      World.remove(world, bodies[i]);
    }
  }
  createBoundaires(world, maxHeight);
});

