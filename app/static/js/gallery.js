// Setup
var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Render = Matter.Render,
    Runner = Matter.Runner

var width = window.innerWidth, height = window.innerHeight;
    
// Engine
var engine = Engine.create(),
  world = engine.world;
world.gravity.y = 0;

// Render
let render = Render.create({
  element: document.body,
  engine: engine,
  options:
  {
    wireframes: false,
  }
});

render.canvas.width = width
render.canvas.height = height
render.options.pixelRatio = 1;
//render.options.background = '#fafafa';

Render.run(render);

// Runner
var runner = Matter.Runner.create();
Runner.run(runner, engine);

// Bodies
new Boundary(width/2,height,width,40) // bottom
new Boundary(width/2,0,width,40) // top
new Boundary(0,height/2,40,height) // left
new Boundary(width,height/2,40,height) // right

new Gallery(width/2-290, height/2-230, 3, 3, 50, 50, 160, 120);

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
render.mouse = mouse;
World.add(world, mouseConstraint);

// Events
Matter.Events.on(mouseConstraint, 'mousemove', function (event) {

  let mousePosition = event.mouse.position;
  let bodies = Matter.Composite.allBodies(engine.world);
  var foundPhysics = Matter.Query.point(bodies, mousePosition);
  
  if (foundPhysics[0] != undefined) {
    document.body.style.cursor = 'pointer';
  }
  else {
    document.body.style.cursor = 'default';
  }


});

function clearBodies() {
  World.clear(world);
  
  // Bodies
  new Boundary(width/2,height,width,40) // bottom
  new Boundary(width/2,0,width,40) // top
  new Boundary(0,height/2,40,height) // left
  new Boundary(width,height/2,40,height) // right

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
  render.mouse = mouse;
  World.add(world, mouseConstraint);
}

function resetBodies() {
  World.clear(world);
  
  // Bodies
  new Boundary(width/2,height,width,40) // bottom
  new Boundary(width/2,0,width,40) // top
  new Boundary(0,height/2,40,height) // left
  new Boundary(width,height/2,40,height) // right

  new Gallery(width/2-290, height/2-230, 3, 3, 50, 50, 160, 120);

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
  render.mouse = mouse;
  World.add(world, mouseConstraint);
}





